import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings.js";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking successfully deleting");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
