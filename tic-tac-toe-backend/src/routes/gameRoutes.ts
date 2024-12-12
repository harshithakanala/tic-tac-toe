import { Router } from 'express';
import { makeMove, resetGame } from '../controllers/gameController';

const router = Router();

router.post('/move', makeMove);
router.post('/reset', resetGame);

export default router;
