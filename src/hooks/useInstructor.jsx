/* eslint-disable no-unused-vars */

import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"


const useInstructor = () => { 
	const { user } = useAuth()
	const [axiosSecure] = useAxiosSecure()
	const {data : isInstructor , isLoading : isInstructorLoading } = useQuery({
		queryKey: ['isInstructor', user?.email],
		queryFn: async () => { 
			const res = await axiosSecure.get(`/users/instructor/${user?.email}`)
			console.log(res.data.instructor)
			return res.data.instructor;
		}
		
	})

	return [isInstructor, isInstructorLoading]
}

export default useInstructor