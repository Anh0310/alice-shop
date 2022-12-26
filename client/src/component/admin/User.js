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
  Switch,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import TablePagination from '@material-ui/core/TablePagination'
import React, { useEffect, useState } from 'react'
import { BiPencil, BiSearchAlt2 } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from './AdminLayout'
import {
  getAllUser,
  setPage,
  updateUserDashboard,
} from '../../redux/slices/userSlice'
import AddEditUser from './AddEditUser'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  home: {
    position: 'relative',
    marginLeft: 300,
    padding: 40,
    backgroundColor: '#f5f6fa',
  },
  tableHead: {
    fontSize: 15,
    fontWeight: 500,
    backgroundColor: '#b7b7b7',
  },
  cellProduct: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 20,
  },
  searchBar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 40,
  },
  searchField: {
    flex: 1,

    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderRadius: '0',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderRadius: '0',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderRadius: '0',
    },
  },
  searchBtn: {
    height: 56,
    width: 100,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    borderRadius: 0,

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
    },
  },
  add: {
    height: 56,
    width: 120,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    borderRadius: 0,
    marginLeft: 40,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
    },
  },
  emptyImg: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 24,
  },
  emptyContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const BlueSwitch = withStyles({
  switchBase: {
    color: blue[300],
    '&$checked': {
      color: blue[600],
    },
    '&$checked + $track': {
      backgroundColor: blue[600],
    },
  },
  checked: {},
  track: {
    background: blue[100],
  },
})(Switch)

const User = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

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

  const handleUpdateUser = (checked, user) => {
    const newUser = {
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
      active: checked,
    }
    const action = updateUserDashboard(newUser)
    dispatch(action)
      .then(unwrapResult)
      .then(() => {
        toast('Update user successfully!', {
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
      .catch((error) => console.log(error))
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
                      Active
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
                          <BlueSwitch
                            onChange={(e) =>
                              handleUpdateUser(e.target.checked, user)
                            }
                            checked={!!user.active}
                          />
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
    </AdminLayout>
  )
}

export default User
