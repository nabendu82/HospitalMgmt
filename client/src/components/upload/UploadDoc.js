import React, { Component } from 'react'
import Buttons from './Buttons'
import Notifications, { notify } from 'react-notify-toast'
import './UploadDoc.css'
import axios from 'axios';

const toastColor = {
  background: 'red',
  text: '#fff'
}

export default class App extends Component {

  state = {
    uploading: false,
    images: []
  }

  toast = notify.createShowQueue()

  onChange = e => {
    const errs = []
    const files = Array.from(e.target.files)
    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time'
      return this.toast(msg, 'custom', 2000, toastColor)
    }

    const formData = new FormData()
    const types = ['image/png', 'image/jpeg', 'image/gif']

    files.forEach((file, i) => {

      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`)
      }

      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`)
      }

      formData.append(i, file)
    })

    if (errs.length) {
      return errs.forEach(err => this.toast(err, 'custom', 2000, toastColor))
    }

    this.setState({ uploading: true })
    axios.post('/image-upload', formData)
    .then(res => {
      if (!res.ok) {
        throw res
      }
      console.log("Inside then", res)

      return res.json()
    })
    .then(images => {
      console.log("Inside then2", images)

      this.setState({
        uploading: false,
        images
      })
    })
    .catch(err => {
        if(err.statusText && err.statusText === "OK"){
            this.setState({ uploading: false, images: [...this.state.images, err.data[0].url] })
            console.log("Inside catch", err.data[0].url)
            console.log(err);
        }
    })
  }

  filter = id => {
    return this.state.images.filter(image => image.public_id !== id)
  }


  onError = id => {
    this.setState({ images: this.filter(id) })
  }

  render() {
    const { uploading, images } = this.state

    const content = () => {
      switch(true) {
        case uploading:
          return <div>Loading...</div>
        case images.length > 0:
          return <div>Aadhar/Passport Uploaded</div>
        default:
          return <Buttons onChange={this.onChange} />
      }
    }

    return (
      <>
        <Notifications />
        <div className='buttons'>
          {content()}
        </div>
      </>
    )
  }
}
