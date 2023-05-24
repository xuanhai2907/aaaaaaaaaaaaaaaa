import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DetailNhanVien = () => {
  const navigate = useNavigate();
  const [nhanVien, setNhanVien] = useState({
    ma: "",
    ten: "",
    gioiTinh: "",
    diaChi: "",
  });
  const { id } = useParams();
  useEffect(() => {
    const fetchNhanVien = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/nhan-vien/detail/${id}`
        );
        setNhanVien(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNhanVien();
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNhanVien((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const updateNhanVien = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/nhan-vien/update/${id}`, nhanVien);
      alert("Sửa thành công");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Thông tin nhân viên</h1>
      <form onSubmit={updateNhanVien}>
        <div className="mb-3">
          <label className="form-label">Mã:</label>
          <input
            className="form-control"
            type="text"
            name="ma"
            value={nhanVien.ma}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tên:</label>
          <input
            className="form-control"
            type="text"
            name="ten"
            value={nhanVien.ten}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Địa chỉ:</label>
          <input
            className="form-control"
            type="text"
            name="diaChi"
            value={nhanVien.diaChi}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Giới tính:</label>
          <div>
            <label>
              <input
                type="radio"
                name="gioiTinh"
                value="Nam"
                checked={nhanVien.gioiTinh === "Nam"}
                onChange={handleInputChange}
              />
              Nam
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="gioiTinh"
                value="Nu"
                checked={nhanVien.gioiTinh === "Nu"}
                onChange={handleInputChange}
              />
              Nữ
            </label>
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default DetailNhanVien;
