import { CarWasher } from '../../interfaces/CarWasher'

export type CarWasherCardProps = CarWasher & {
    toggleLiked: () => void,
    onClick: () => void
}