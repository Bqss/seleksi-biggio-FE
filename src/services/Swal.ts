import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface ISweetAlert {
  icon: string;
  title: string;
  text: string;
  hasConfirmButton?: boolean;
}



const MySwal = withReactContent(Swal);
const sweetAlert = MySwal.mixin({
  customClass: {
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-danger",
  }
})

export default sweetAlert;