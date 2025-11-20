import express from 'express';
import reservationController from './reservation.controller.js';

const router = express.Router();

router.post('/', reservationController.createReservation);
router.get('/', reservationController.getReservations);
router.get('/:reservationId', reservationController.getReservation);
router.put('/:reservationId', reservationController.updateReservation);
router.delete('/:reservationId', reservationController.deleteReservation);

export default router;
