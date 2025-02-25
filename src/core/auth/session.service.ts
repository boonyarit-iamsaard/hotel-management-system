import { sha256 } from '@oslojs/crypto/sha2';
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';
import type { Session, User } from '@prisma/client';

import { db } from '~/core/database/client';

export function createSessionService() {
  async function createSession(
    token: string,
    userId: string,
  ): Promise<Session> {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );
    const session: Session = {
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    };

    // TODO: move to repository
    await db.session.create({
      data: session,
    });

    return session;
  }

  function generateSessionToken(): string {
    const bytes = crypto.getRandomValues(new Uint8Array(20));

    return encodeBase32LowerCaseNoPadding(bytes);
  }

  async function invalidateAllSessions(userId: string): Promise<void> {
    await db.session.deleteMany({
      where: {
        userId: userId,
      },
    });
  }

  async function invalidateSession(sessionId: string): Promise<void> {
    await db.session.delete({ where: { id: sessionId } });
  }

  async function validateSessionToken(
    token: string,
  ): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );
    // TODO: move to repository
    const result = await db.session.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        user: true,
      },
    });
    if (result === null) {
      return { session: null, user: null };
    }

    const { user, ...session } = result;
    if (Date.now() >= session.expiresAt.getTime()) {
      // TODO: move to repository
      await db.session.delete({ where: { id: sessionId } });

      return { session: null, user: null };
    }

    // TODO: improve session expiration management
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
      session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
      await db.session.update({
        where: {
          id: session.id,
        },
        data: {
          expiresAt: session.expiresAt,
        },
      });
    }

    return { session, user };
  }

  return {
    createSession,
    generateSessionToken,
    invalidateAllSessions,
    invalidateSession,
    validateSessionToken,
  };
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
