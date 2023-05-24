import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListNhanVien = () => {
  const [nhanViens, setNhanVien] = useState([]);

  useEffect(() => {
    fetchNhanViens();
  }, []);

  const fetchNhanViens = async () => {
    try {
      const respone = await axios.get(
        "http://localhost:8080/nhan-vien/hien-thi"
      );
      setNhanVien(respone.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNhanVien = async (id) => {
    try {
      await axios.delete("http://localhost:8080/nhan-vien/delete/" + id);
      fetchNhanViens();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-center">List nhân viên</h1>
      <Link to="/create" className="btn btn-info m-5">
        Add
      </Link>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Mã</th>
            <th>Tên</th>
            <th>Giới tính</th>
            <th>Địa chỉ</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {nhanViens.map((nhanVien) => (
            <tr key={nhanVien.id}>
              <td>{nhanVien.id}</td>
              <td>{nhanVien.ma}</td>
              <td>{nhanVien.ten}</td>
              <td>{nhanVien.gioiTinh}</td>
              <td>{nhanVien.diaChi}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteNhanVien(nhanVien.id)}
                >
                  Delete
                </button>
                <Link
                  to={`/detail/${nhanVien.id}`}
                  className="btn btn-success ml-4"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListNhanVien;
