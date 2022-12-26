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
import AdminLayout from './AdminLayout'
import {
  deleteSize,
  getAllSize,
  setPage,
} from '../../redux/slices/sizeSlice'
import AddEditSize from './AddEditSize'
import useModal from '../../hooks/useModal'
import DeleteModal from './DeleteModal'
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

const Size = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const sizes = useSelector((state) => state.size.sizes)
  const limit = useSelector((state) => state.size.limit)
  const currentPage = useSelector((state) => state.size.currentPage)
  const totalItems = useSelector((state) => state.size.totalItems)

  const { open, handleClose, handleOpen } = useModal()
  const [deletedSizeId, setDeletedSizeId] = useState('')

  const [keyword, setKeyword] = useState('')
  const handleChangeSearch = () => {
    dispatch(getAllSize({ currentPage: 0, limit, keyword }))
  }

  const [openAddModal, setOpenAddModal] = useState(false)
  const handleOpenAddModal = () => {
    setOpenAddModal(true)
  }
  const handleCloseAddModal = () => {
    setOpenAddModal(false)
  }

  const [editedSize, setEditedSize] = useState()
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpenEditModal = (size) => {
    setEditedSize(size)
    setOpenEditModal(true)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  useEffect(() => {
    const fetchSizes = () => {
      const action = getAllSize()
      dispatch(action)
        .then(unwrapResult)
        .then((res) => {})
        .catch((error) => {
          console.log(error)
        })
    }
    fetchSizes()
  }, [dispatch])

  const handleDeleteSize = (id) => {
    const action = deleteSize(id)
    dispatch(action)
      .then(unwrapResult)
      .then(() => {
        handleClose()
        toast('Delete size successfully!', {
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

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage))
    dispatch(getAllSize({ currentPage: newPage, limit }))
  }

  return (
    <AdminLayout>
      <Box className={classes.home}>
        <Box className={classes.searchBar}>
          <TextField
            placeholder="Search for name"
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
          <AddEditSize open={openAddModal} handleClose={handleCloseAddModal} />
        </Box>
        {sizes?.length > 0 ? (
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
                      Name
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
                  {sizes.length > 0 &&
                    sizes.map((size) => {
                      return (
                        <TableRow key={size._id}>
                          <TableCell component="th" scope="row" align="center">
                            <Typography component="body2">
                              {size.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            {new Date(size.createdAt).toLocaleString()}
                          </TableCell>

                          <TableCell align="center">
                            {new Date(size.updatedAt).toLocaleString()}
                          </TableCell>
                          <TableCell align="center">
                            <BiPencil
                              style={{
                                cursor: 'pointer',
                                fontSize: 20,
                                marginRight: 20,
                              }}
                              onClick={() => handleOpenEditModal(size)}
                            />
                            <BiX
                              style={{ cursor: 'pointer', fontSize: 20 }}
                              onClick={() => {
                                setDeletedSizeId(size._id)
                                handleOpen()
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  <AddEditSize
                    open={openEditModal}
                    handleClose={handleCloseEditModal}
                    size={editedSize}
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
      </Box>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        handleSubmit={() => handleDeleteSize(deletedSizeId)}
      />
    </AdminLayout>
  )
}

export default Size
