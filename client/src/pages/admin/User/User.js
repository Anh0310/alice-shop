import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'
import TablePagination from '@material-ui/core/TablePagination'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { BiPencil, BiSearchAlt2, BiX } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminLayout from '../../../component/admin/AdminLayout/AdminLayout'
import {
  deleteUser,
  getAllUser,
  setPage,
} from '../../../redux/slices/userSlice'
import AddEditUser from './AddEditUser/AddEditUser'
import { useStyles } from './styles'
import useModal from '../../../hooks/useModal'
import DeleteModal from '../../../component/DeleteModal/DeleteModal'

const User = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { open, handleClose, handleOpen } = useModal()
  const [deletedUserId, setDeletedUserId] = useState('')

  const currentUser = useSelector((state) => state.user.user)
  const users = useSelector((state) => state.user.users)

  const limit = useSelector((state) => state.user.limit)
  const currentPage = useSelector((state) => state.user.currentPage)
  const totalItems = useSelector((state) => state.user.totalItems)

  const [keyword, setKeyword] = useState('')
  const handleChangeSearch = () => {
    dispatch(getAllUser({ currentPage: 0, limit, keyword }))
  }

  const [openAddModal, setOpenAddModal] = useState(false)
  const handleOpenAddModal = () => {
    setOpenAddModal(true)
  }
  const handleCloseAddModal = () => {
    setOpenAddModal(false)
  }

  const [editedUser, setEditedUser] = useState()
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpenEditModal = (user) => {
    setEditedUser(user)
    setOpenEditModal(true)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage))
    dispatch(getAllUser({ currentPage: newPage, limit }))
  }

  const handleDeleteUser = (id) => {
    const action = deleteUser(id)
    dispatch(action)
      .then(unwrapResult)
      .then(() => {
        handleClose()
        toast('Delete user successfully!', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'success',
        })
      })
  }

  useEffect(() => {
    const fetchUsers = () => {
      dispatch(getAllUser({ currentPage: 0 }))
    }
    fetchUsers()
  }, [dispatch])

  return (
    <AdminLayout>
      <form className={classes.home}>
        <Box className={classes.searchBar}>
          <TextField
            placeholder="Search for email"
            variant="outlined"
            className={classes.searchField}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <IconButton
            className={classes.searchBtn}
            onClick={handleChangeSearch}
          >
            <BiSearchAlt2 />
          </IconButton>
          <Button className={classes.add} onClick={handleOpenAddModal}>
            Add
          </Button>
          <AddEditUser open={openAddModal} handleClose={handleCloseAddModal} />
        </Box>
        {users?.length > 0 ? (
          <>
            <TableContainer
              component={Paper}
              elevation="0"
              style={{ marginBottom: 25 }}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableHead}>
                      Fullname
                    </TableCell>
                    <TableCell align="center" className={classes.tableHead}>
                      Email
                    </TableCell>
                    <TableCell align="center" className={classes.tableHead}>
                      Created Date
                    </TableCell>
                    <TableCell align="center" className={classes.tableHead}>
                      Updated Date
                    </TableCell>
                    <TableCell align="center" className={classes.tableHead}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => {
                    return (
                      <TableRow>
                        <TableCell component="th" scope="row" align="center">
                          {user.fullName}
                        </TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">
                          {new Date(user.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(user.updatedAt).toLocaleString()}
                        </TableCell>
                        <TableCell align="center">
                          <BiPencil
                            style={{
                              cursor: 'pointer',
                              fontSize: 20,
                              marginRight: 20,
                            }}
                            onClick={() => {
                              handleOpenEditModal(user)
                            }}
                          />
                          <BiX
                            style={{
                              cursor: 'pointer',
                              fontSize: 20,
                              visibility:
                                currentUser?._id !== user._id
                                  ? 'visible'
                                  : 'hidden',
                            }}
                            onClick={() => {
                              if (currentUser?._id !== user._id) {
                                setDeletedUserId(user._id)
                                handleOpen()
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  <AddEditUser
                    open={openEditModal}
                    handleClose={handleCloseEditModal}
                    user={editedUser}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={totalItems}
              rowsPerPageOptions={[limit]}
              page={currentPage}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
            />
          </>
        ) : (
          <Box className={classes.emptyContainer}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
              alt=""
              className={classes.emptyImg}
            />
            <Typography component="p" className={classes.emptyTitle}>
              It's empty in here
            </Typography>
          </Box>
        )}
      </form>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        handleSubmit={() => handleDeleteUser(deletedUserId)}
      />
    </AdminLayout>
  )
}

export default User
