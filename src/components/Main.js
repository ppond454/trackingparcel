import {useLayoutEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Select from "@material-ui/core/Select"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import Info from "./Info"


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
 
}))

export default function Main() {
  const classes = useStyles()
  const { handleSubmit, control } = useForm()
  const [data, setData] = useState(null)
  const [loading , setLoading] = useState(false)


  const _fetchData = (tracking_number, carrier_code) => {
    const track = axios.post(
      "/v1/trackings/post",
      {
        tracking_number: tracking_number,
        carrier_code: carrier_code,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Tracktry-Api-Key": "your key",
        },
      }
    )

    const realtime = axios.post(
      "/v1/trackings/realtime",
      {
        tracking_number: tracking_number,
        carrier_code: carrier_code,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Tracktry-Api-Key": "your key",
        },
      }
    )

    axios.all([track, realtime]).then(
      axios.spread((...allData) => {
        //const tracked = allData[0]
        const dataRealtime = allData[1].data.data.items[0].origin_info.trackinfo

        console.log(dataRealtime)
        if (dataRealtime === null) {
          localStorage.removeItem("dataRealtime")
          setData(null)
          setLoading(false)
          alert("Please check your Tracking ID and Carrier name")
        } else {
          localStorage.setItem("dataRealtime", JSON.stringify(dataRealtime))
          let _data = JSON.parse(localStorage.getItem("dataRealtime"))
          setData(_data)
          setLoading(false)
        }
      })
    )
  }

  const onSubmit = (values) => {
    setLoading(true)
    let { tracking_number, carrier_code } = values

    try {
      _fetchData(tracking_number, carrier_code)
    } catch (err) {
      console.log(err)
    }
  }

  useLayoutEffect(() => {

    let _data = JSON.parse(localStorage.getItem("dataRealtime"))
      setData(_data)
  }, [])

  const handleReset = () => {
    setData(null)
    localStorage.removeItem("dataRealtime")
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
 
      <Controller
        name="tracking_number"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl
            fullWidth
            className={classes.textField}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-amount">
              Tracking ID
            </InputLabel>
            <OutlinedInput
              label="Tracking ID"
              variant="filled"
              value={value}
              onChange={onChange}
              error={!!error}
            />
          </FormControl>
        )}
        rules={{ required: "Tracking ID required" }}
      />

      <Controller
        name="carrier_code"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl
            fullWidth
            className={classes.textField}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              Carrier
            </InputLabel>
            <Select
              native
              label="Carrier"
              variant="filled"
              value={value}
              onChange={onChange}
              error={!!error}
            >
              <option aria-label="None" value="" />
              <option value={"kerryexpress-th"}>Kerry Express</option>
              <option value={"jt-express"}>JT Express</option>
              <option value={"thailand-post"}>Thailand Post</option>
              <option value={"scg-express"}>SCG Express</option>
              <option value={"ninjavan-th"}>Ninja Van</option>
            </Select>
          </FormControl>
        )}
        rules={{ required: "Tracking ID required" }}
      />

      <FormControl fullWidth className={classes.textField} variant="outlined">
        <Button
          className={classes.textField}
          variant="contained"
          color="primary"
          type="submit"
        >
          Search
        </Button>
        <Button
          className={classes.textField}
          variant="contained"
          color="secondary"
          type="reset"
          onClick={handleReset}
        >
          Reset
        </Button>
      </FormControl>
      <Info data={data} loading ={loading} />
      
    </form>
  )
}
