import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: isUser, isLoading: isUserLoading } = useQuery({
    queryKey: ["isUser", user?.email],
    queryFn: async () => {
		const res = await axiosSecure.get(`/users/student/${user?.email}`);
      return res.data.user;
    },
  });

  return [isUser, isUserLoading];
};

export default useUser;
