import { CarWasher } from '../../interfaces/CarWasher'

export type CarWasherDetailsCardProps = CarWasher & { toggleLiked: () => void, id: string }