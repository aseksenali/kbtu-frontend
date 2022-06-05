import { useParams } from 'react-router-dom'
import { useGetCarWasherByIdQuery } from '../redux/reducers/carWasherSlice'

export const useActiveCarWasher = () => {
    const { id } = useParams()
    if (!id) throw Error()
    const { data: activeCarWasher, error, isLoading } = useGetCarWasherByIdQuery(id)
    return { activeCarWasher, error, isLoading }
}