import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminLayout from './AdminLayout'
import { getAllCategory } from '../../redux/slices/categorySlice'
import {
  addProduct,
  updateProduct,
  getProduct,
  upload,
} from '../../redux/slices/productSlice'
import { getAllSize } from '../../redux/slices/sizeSlice'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginLeft: 300,
    padding: 40,
    backgroundColor: '#f5f6fa',
  },
  content: {
    display: 'flex',
    gap: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 30,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 350,
  },
  uploadContainer: {
    marginBottom: 20,
  },
  uploadBtn: {
    backgroundColor: '#ddd',
    marginLeft: 20,
  },
  inputGroup: {
    marginBottom: 30,
    color: theme.palette.text.primary,

    '& .MuiInputLabel-outlined': {
      color: theme.palette.text.primary,
    },
  },
  carousel: {
    flex: 1,

    '& .carousel .slide img': {
      height: 'auto',
      objectFit: 'cover',
    },

    '& .carousel .thumb': {
      border: '3px solid transparent',
    },

    '& .carousel .thumb.selected': {
      border: '3px solid red',
    },

    '& .carousel .thumbs-wrapper': {
      marginTop: 20,
      marginLeft: 0
    },
  },
  saveBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    borderRadius: 0,

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
    },
  },
  error: {
    width: 350,
    color: '#c74a47',
    backgroundColor: '#fbe2e2',
    fontSize: '16px',
    textAlign: 'left',
    padding: '10px 15px',
    marginBottom: 20,
  },
  inStock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
}))

const icon = <BiCheckbox />
const checkedIcon = <BiCheckboxChecked />

const AddEditProduct = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const productId = params?.id ? String(params.id) : ''

  const categories = useSelector((state) => state.category.categories)
  const product = useSelector((state) => state.product.product)
  const sizes = useSelector((state) => state.size.sizes)
  const { register, handleSubmit, reset, control } = useForm()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = () => {
      const action = getAllCategory()
      dispatch(action)

      const action2 = getAllSize()
      dispatch(action2)
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    const isEditMode = productId !== ''
    if (!isEditMode) return

    const fetchData = () => {
      const action = getProduct(productId)
      dispatch(action)
    }
    fetchData()
  }, [productId, dispatch])

  useEffect(() => {
    const isEditMode = productId !== ''
    if (!isEditMode) return

    if (product) {
      reset({
        name: product.name,
        desc: product.desc,
        price: product.price,
        quantity: product.quantity,
        inStock: product.inStock.toString(),
      })
      setImagesDisplay(product.images.map((image) => image))
      setSelectedSizes(product.size)
    }
  }, [productId, product, reset])

  // autocomplete
  const [selectedSizes, setSelectedSizes] = useState([])

  // Handle select multiple images
  const [imagesDisplay, setImagesDisplay] = useState([])
  const [imagesUpload, setImagesUpload] = useState([])

  const handleOnChangePictures = (e) => {
    const files = e.target.files
    const arrImagesPreview = []
    const arrImagesUpload = []

    Array.from(files)?.forEach((file) => {
      const image = { preview: URL.createObjectURL(file) }
      arrImagesPreview.push(image)
      arrImagesUpload.push(file)
    })
    setImagesDisplay(arrImagesPreview)
    setImagesUpload(arrImagesUpload)
  }

  useEffect(() => {
    return () => {
      imagesDisplay?.length > 0 &&
        imagesDisplay.forEach((image) => {
          URL.revokeObjectURL(image.preview)
        })
    }
  }, [imagesDisplay])

  // handle product
  const handleAddProduct = (data) => {
    if (imagesUpload.length === 0) {
      setError('Images are required')
      return
    }

    if (selectedSizes.length === 0) {
      setError('Sizes are required')
      return
    }

    const action = upload(imagesUpload)
    dispatch(action)
      .then(unwrapResult)
      .then((res) => {
        const product = { ...data, size: selectedSizes, images: res }
        const action = addProduct(product)
        dispatch(action)
          .then(unwrapResult)
          .then(() => {
            toast('Add product successfully!', {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              type: 'success',
            })
            history.push('/admin/product')
          })
          .catch((error) => setError('Name has already been taken'))
      })
      .catch((error) => console.log(error))
  }

  const handleEditProduct = (data) => {
    if (imagesUpload.length === 0) {
      // Not change images
      const sizes = selectedSizes.map((size) => {
        return size._id
      })
      const editedProduct = { ...data, size: sizes, _id: product?._id }
      const action = updateProduct(editedProduct)
      dispatch(action)
        .then(unwrapResult)
        .then(() => {
          history.push('/admin/product')
        })
        .catch((error) => setError('Name has already been taken'))
    } else {
      const action = upload(imagesUpload)
      dispatch(action)
        .then(unwrapResult)
        .then((res) => {
          const editedProduct = {
            ...data,
            size: sizes,
            _id: product?._id,
            images: res,
          }
          const action = updateProduct(editedProduct)
          dispatch(action)
            .then(unwrapResult)
            .then(() => {
              toast('Update product successfully!', {
                position: 'bottom-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: 'success',
              })
              history.push('/admin/product')
            })
            .catch((error) => setError('Name has already been taken'))
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <AdminLayout>
      <Box className={classes.container}>
        <Typography component="h3" className={classes.heading}>
          {product ? 'Update' : 'New'} product
        </Typography>
        <Box className={classes.content}>
          <form
            className={classes.form}
            onSubmit={handleSubmit(
              productId !== '' ? handleEditProduct : handleAddProduct,
            )}
          >
            <Box className={classes.uploadContainer}>
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleOnChangePictures}
              />
              <label htmlFor="raised-button-file">
                Images
                <Button
                  variant="raised"
                  component="span"
                  className={classes.uploadBtn}
                >
                  Upload
                </Button>
              </label>
            </Box>
            <TextField
              label="Name"
              variant="outlined"
              className={classes.inputGroup}
              {...register('name')}
              required
            />
            <TextField
              label="Desc"
              variant="outlined"
              className={classes.inputGroup}
              {...register('desc')}
              required
            />
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              className={classes.inputGroup}
              {...register('price')}
              required
            />
            <FormControl component="fieldset" className={classes.inStock}>
              <Typography variant="body1" style={{ marginRight: 20 }}>
                In stock:
              </Typography>
              <Controller
                rules={{ required: true }}
                control={control}
                defaultValue={product?.inStock?.toString() || 'true'}
                {...register('inStock')}
                required
                render={({ field }) => {
                  return (
                    <RadioGroup style={{ flexDirection: 'row' }} {...field}>
                      <FormControlLabel
                        value="true"
                        control={
                          <Radio
                            style={{
                              color: '#1a202c',
                              '&$checked': {
                                color: '#1a202c',
                              },
                            }}
                          />
                        }
                        label="True"
                      />
                      <FormControlLabel
                        value="false"
                        control={
                          <Radio
                            style={{
                              color: '#1a202c',
                              '&$checked': {
                                color: '#1a202c',
                              },
                            }}
                          />
                        }
                        label="false"
                      />
                    </RadioGroup>
                  )
                }}
              />
            </FormControl>
            <TextField
              className={classes.inputGroup}
              id="select"
              label="Category"
              select
              variant="outlined"
              {...register('category')}
              defaultValue={product?.category?._id}
              required
            >
              {categories?.map((category) => {
                return (
                  <MenuItem value={category._id} key={category._id}>
                    {category.name}
                  </MenuItem>
                )
              })}
            </TextField>

            <Autocomplete
              className={classes.inputGroup}
              id="combo-box-demo"
              multiple
              disableCloseOnSelect
              value={selectedSizes}
              options={sizes}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => value._id === option._id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Size"
                  variant="outlined"
                  fullWidth
                />
              )}
              renderOption={(option, { selected }) => (
                <>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </>
              )}
              onChange={(_, selectedOptions) =>
                setSelectedSizes(selectedOptions)
              }
            />
            {error !== '' && (
              <Typography component="p" className={classes.error}>
                {error}
              </Typography>
            )}
            <Button type="submit" className={classes.saveBtn}>
              Save
            </Button>
          </form>
          <Carousel
            showIndicators={false}
            showArrows={false}
            showStatus={false}
            className={classes.carousel}
          >
            {imagesDisplay?.length > 0 &&
              imagesDisplay.map((image) => {
                return (
                  <div>
                    <img src={image.preview} alt="imageproduct" />
                  </div>
                )
              })}
          </Carousel>
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default AddEditProduct
