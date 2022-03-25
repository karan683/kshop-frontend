import React, { useEffect } from "react";
import LoadingSpinnner from "../components/LoadingSpinner";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import {
  BsCheckLg,
  ImCross,
  MdModeEditOutline,
  MdDelete,
} from "react-icons/all";
import { Link } from "react-router-dom";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <div className="lg:px-56">
        <h1 className="text-3xl font-semibold mb-8">USERS</h1>
        {loading ? (
          <LoadingSpinnner />
        ) : error ? (
          <Message variant="bg-red-200">{error}</Message>
        ) : (
          <>
            {users.length === 0 ? (
              <Message variant="bg-green-200">No users found !</Message>
            ) : (
              <div className="overflow-auto">
                <table>
                  <thead>
                    <tr className="">
                      <th className="px-28 py-2 font-semibold border">ID</th>
                      <th className="px-16 py-2 font-semibold border">Name</th>
                      <th className="px-24 py-2 font-semibold border">EMAIL</th>
                      <th className="px-12 py-2 font-semibold border">ADMIN</th>
                      <th className="px-16 py-2 border"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-2 py-2 font-semibold border">
                          {user._id}
                        </td>
                        <td className="text-center py-2 font-semibold border">
                          {user.name}
                        </td>
                        <td className="text-center py-2 font-semibold border">
                          {user.email}
                        </td>
                        <td className=" py-2 font-semibold border">
                          {user.isAdmin ? (
                            <span className="flex justify-center text-green-500 text-xl">
                              <BsCheckLg />
                            </span>
                          ) : (
                            <span className="flex justify-center text-red-500">
                              <ImCross />
                            </span>
                          )}
                        </td>
                        <td className=" py-2 border">
                          <div className="flex justify-center">
                            <span className="my-1 text-xl text-black p-2 bg-white cursor-pointer">
                              <Link to={`/admin/user/${user._id}/edit`}>
                                <MdModeEditOutline />
                              </Link>
                            </span>
                            <span
                              className="my-1 text-xl text-white  p-2 bg-red-400 cursor-pointer"
                              onClick={(e) => {
                                deleteHandler(user._id);
                              }}
                            >
                              <MdDelete />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserListScreen;
