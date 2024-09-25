'use client'

import { uploadImage } from '@/server/upload_image'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '../ui/card'

const UploadImage = () => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
            'image/webp': ['.webp'],
        },
        onDrop: async (acceptedFiles, rejectedFiles) => {
            if (acceptedFiles.length) {
                const formData = new FormData()
                formData.append('image', acceptedFiles[0])
                const objectUrl = URL.createObjectURL(acceptedFiles[0])
                //State mgmt stuff, create layers, set active layer,set img as active layer
                const res = await uploadImage({ image: formData })
            }
        }
    })
    return (
        <Card {...getRootProps()}>
            <CardContent >
                <input {...getInputProps()} type='text' />
                <div>
                    <h1> cool animation</h1>
                    <p>
                        {isDragActive ? 'Drop your image here!' : 'Start by uploading an image'}
                    </p>
                    <p>Supported formats : .jpg, .jpeg, .png, .webp</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default UploadImage