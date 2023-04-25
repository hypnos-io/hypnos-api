import {NextFunction, Request, Response} from 'express'

export function authRequired(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!request.headers['Authorization'])
    return response.status(403).json({
      message: 'Access Unauthorized',
      now: new Date(),
    })
  next()
}
