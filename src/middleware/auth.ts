import { NextApiRequest, NextApiResponse } from 'next'
import { verifyToken } from '@/lib/jwt'

export function authMiddleware(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '')
      
      if (!token) {
        return res.status(401).json({ message: 'Authentication required' })
      }

      const decoded = verifyToken(token)
      ;(req as any).user = decoded

      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }}
