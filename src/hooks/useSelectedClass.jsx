/* eslint-disable no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useSelectedClass = () => {

	const { user, loading } = useAuth()
	const [axiosSecure] = useAxiosSecure()
	const {refetch, data : selectedClass =[] } = useQuery({
		queryKey: ['selectedClass', user?.email],
		enabled: !loading,
		queryFn: async () => { 
			const res = await axiosSecure(`/selectedClass?email=${user?.email}`)
            return res.data;
		}

	})
	return [refetch , selectedClass]


};

export default useSelectedClass;