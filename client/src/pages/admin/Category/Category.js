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
import React, { useEffect, useState } from 'react'
import { BiPencil, BiSearchAlt2, BiX } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../../component/admin/AdminLayout/AdminLayout'
import {
  deleteCategory,
  getAllCategory,
  setPage,
} from '../../../redux/slices/categorySlice'
import AddEditCategory from './AddEditCategory/AddEditCategory'
import { toast } from 'react-toastify'
import { useStyles } from './styles'
import { unwrapResult } from '@reduxjs/toolkit'
import useModal from '../../../hooks/useModal'
import DeleteModal from '../../../component/DeleteModal/DeleteModal'

const Category = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category.categories)
  const limit = useSelector((state) => state.category.limit)
  const currentPage = useSelector((state) => state.category.currentPage)
  const totalItems = useSelector((state) => state.category.totalItems)

  const { open, handleClose, handleOpen } = useModal()
  const [deletedCategoryId, setDeletedCategoryId] = useState('')

  useEffect(() => {
    const fetchCategories = () => {
      const action = getAllCategory({ currentPage: 0 })
      dispatch(action)
    }
    fetchCategories()
  }, [dispatch])

  const [keyword, setKeyword] = useState('')
  const handleChangeSearch = () => {
    dispatch(getAllCategory({ currentPage: 0, limit, keyword }))
  }

  const [openAddModal, setOpenAddModal] = useState(false)
  const handleOpenAddModal = () => {
    setOpenAddModal(true)
  }
  const handleCloseAddModal = () => {
    setOpenAddModal(false)
  }

  const [editedCategory, setEditedCategory] = useState()
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpenEditModal = (category) => {
    setEditedCategory(category)
    setOpenEditModal(true)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleDeleteCategory = (id) => {
    const action = deleteCategory(id)
    dispatch(action)
      .then(unwrapResult)
      .then(() => {
        handleClose()
        toast('Delete category successfully!', {
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
    dispatch(getAllCategory({ currentPage: newPage, limit }))
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
          <AddEditCategory
            open={openAddModal}
            handleClose={handleCloseAddModal}
          />
        </Box>
        {categories?.length > 0 ? (
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
                  {categories?.map((category) => {
                    return (
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          <Typography component="p">{category.name}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          {new Date(category.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(category.updatedAt).toLocaleString()}
                        </TableCell>
                        <TableCell align="center">
                          <BiPencil
                            style={{
                              cursor: 'pointer',
                              fontSize: 20,
                              marginRight: 20,
                            }}
                            onClick={() => {
                              handleOpenEditModal(category)
                            }}
                          />
                          <BiX
                            style={{ cursor: 'pointer', fontSize: 20 }}
                            onClick={() => {
                              setDeletedCategoryId(category._id)
                              handleOpen()
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  <AddEditCategory
                    open={openEditModal}
                    handleClose={handleCloseEditModal}
                    category={editedCategory}
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
        handleSubmit={() => handleDeleteCategory(deletedCategoryId)}
      />
    </AdminLayout>
  )
}

export default Category
