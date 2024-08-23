import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails, nextPage } from "../redux/formSlice";
import CustomInput from "./CustomInput";

const UserForm = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.form.user_details);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUserDetails({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(nextPage());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <CustomInput
          type="text"
          name="name"
          placeholder="Name"
          value={userDetails.name}
          onChange={handleChange}
        />

        <CustomInput
          type="email"
          name="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={handleChange}
        />

        <CustomInput
          type="text"
          name="mobile_number"
          placeholder="Mobile Number"
          value={userDetails.mobile_number}
          onChange={handleChange}
        />

        <CustomInput
          type="number"
          name="age"
          placeholder="Age"
          value={userDetails.age}
          onChange={handleChange}
        />

        <div className="col-md-6 col-12 mb-3">
          <select
            className="form-control col-6"
            name="gender"
            value={userDetails.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="col-md-6 col-12 mb-3">
          <select
            className="form-control"
            name="blood_group"
            value={userDetails.blood_group}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <CustomInput
          type="number"
          name="height"
          placeholder="Height"
          value={userDetails.height}
          onChange={handleChange}
        />
        <CustomInput
          type="number"
          name="weight"
          placeholder="Weight"
          value={userDetails.weight}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-sm btn-primary">Next</button>
      </div>
    </form>
  );
};

export default UserForm;
