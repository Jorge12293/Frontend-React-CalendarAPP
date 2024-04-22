
import { useAppDispatch, useAppSelector } from "../store/store";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
    const dispatch = useAppDispatch();

    const { isDateModalOpen } = useAppSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal
            : closeDateModal();
    }

    return {
        // Properties
        isDateModalOpen,
        //Methods
        openDateModal,
        closeDateModal,
        toggleDateModal
    }

}


