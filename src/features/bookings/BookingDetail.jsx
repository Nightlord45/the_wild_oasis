import styled from "styled-components";

import BookingDataBox from "./BookingDataBox.jsx";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import ButtonText from "../../ui/ButtonText.jsx";

import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useBooking } from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import Menus from "../../ui/Menus.jsx";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout.js";
import Modal from "../../ui/Modal.jsx";
import { HiTrash } from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import { useDeleteBooking } from "./useDeleteBooking.js";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(bookingId)}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )}
          <Modal.Open
            opens="delete"
            render={(openModal) => (
              <Button variation="danger" icon={<HiTrash />} onClick={openModal}>
                Delete booking
              </Button>
            )}
          />
          <Modal.Window
            name={"delete"}
            render={(close) => (
              <ConfirmDelete
                resourceName="booking"
                disabled={isDeleting}
                onConfirm={() =>
                  deleteBooking(bookingId, {
                    onSettled: () => navigate(-1),
                  })
                }
                onCloseModal={close}
              />
            )}
          />
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
