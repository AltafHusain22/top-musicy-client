/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useMyClasses = () => {
	const { user, loading } = useAuth()
	const [axiosSecure] = useAxiosSecure()
	const {refetch, data : myClassess =[] } = useQuery({
		queryKey: ['myClassess', user?.email],
		enabled: !loading,
		queryFn: async () => { 
			const res = await axiosSecure(`/myclasses?email=${user?.email}`)
            return res.data;
		}

	})
	return [refetch , myClassess]
};

export default useMyClasses;