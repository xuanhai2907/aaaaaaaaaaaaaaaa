import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateNhanVien = () => {
  const navigate = useNavigate();
  const [ma, setMa] = useState("");
  const [ten, setTen] = useState("");
  const [gioiTinh, setGioiTinh] = useState("Nam");
  const [diaChi, setDiaChi] = useState("");

  const gioiTinhChange = (e) => {
    setGioiTinh(e.target.value);
  };
  const createNhanVien = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/nhan-vien/add", {
        ma,
        ten,
        diaChi,
        gioiTinh,
      });
      alert("Thêm thành công");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-center">Create nhân viên</h2>
      <form onSubmit={createNhanVien}>
        <div className="mb-3">
          <label for="" className="form-label">
            Mã:
          </label>
          <input
            className="form-control"
            placeholder="Nhập mã"
            type="text"
            value={ma}
            onChange={(e) => setMa(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="" className="form-label">
            Tên:
          </label>
          <input
            className="form-control"
            placeholder="Nhập tên"
            type="text"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="" className="form-label">
            Địa chỉ:
          </label>
          <input
            className="form-control"
            placeholder="Nhập địa chỉ"
            type="text"
            value={diaChi}
            onChange={(e) => setDiaChi(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-3">
            <label className="form-label">Giới tính:</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gioiTinh"
                value="Nam"
                checked={gioiTinh === "Nam"}
                onChange={gioiTinhChange}
              />
              <label className="form-check-label">Nam</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gioiTinh"
                value="Nu"
                checked={gioiTinh === "Nu"}
                onChange={gioiTinhChange}
              />
              <label className="form-check-label">Nữ</label>
            </div>
          </div>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
export default CreateNhanVien;
