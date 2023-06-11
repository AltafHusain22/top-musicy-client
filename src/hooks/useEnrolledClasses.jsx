import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useEnrolledClasses = () => {
	const { user, loading } = useAuth()
	const [axiosSecure] = useAxiosSecure()
	const {refetch, data : enrolledclasses =[] } = useQuery({
		queryKey: ['enrolledClass', user?.email],
		enabled: !loading,
		queryFn: async () => { 
			const res = await axiosSecure(`/enrolledclasses?email=${user?.email}`)
            return res.data;
		}

	})
	return [refetch , enrolledclasses]
};

export default useEnrolledClasses;