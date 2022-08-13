import React from 'react'
import axios from 'axios'
import clsx from 'clsx'
import { useNavigate, useParams } from 'react-router'
import Form from 'react-bootstrap/Form'
import UserContext from '../../../contexts/UserContext'
import useFetchData from '../../../hooks/useFetchData'
import ToastMessage from '../../../components/ToastMessage/ToastMessage'
import './EditProduct.css'

const validateProduct = (product) => {
    const productValues = Object.values(product)
    return productValues.every(value => value !== '')
}

const EditProduct = () => {
    const { login, accessToken } = React.useContext(UserContext)
    let navigate = useNavigate()

    React.useEffect(() => {
        if (!login)
            navigate('/')
    }, [login])

    const {id} = useParams()
    const {data} = useFetchData(`http://localhost:3500/product/${id}`)
    const [product, setProduct] = React.useState(null)
    const [updateMessage, setUpdateMessage] = React.useState('')
    const [updateStep, setUpdateStep] = React.useState(1)
    const [imageFiles, setImageFiles] = React.useState(null)


    React.useEffect(() => {
        let p = data.product
        setProduct({
            id: p?._id,
            name: p?.name,
            price: p?.price,
            star: p?.star,
            type: p?.type.name,
            brand: p?.brand.name,
            hf1: p?.hf1,
            hf2: p?.hf2,
            hf3: p?.hf3,
            hf4: p?.hf4,
            description: p?.description,
            ...p?.tech
        })
    }, [data])

    React.useEffect(() => {
        let tid = setTimeout(() => setUpdateMessage(null), 2500)

        return () => {
            clearTimeout(tid)
        }
    }, [updateMessage])

    const handleUpdateProduct = () => {
        const config = {
            method: 'put',
            url: 'http://localhost:3500/product/edit',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: JSON.stringify(product)
        }
        axios(config)
            .then(response => {
                setUpdateMessage(response.data.result)
                setUpdateStep(1)
                setImageFiles(null)
            })
            .catch(error => setUpdateMessage(error.response.data.result))
    }

    return (
        <div className='content'>
            {updateMessage && updateMessage !== '' && 
                <ToastMessage 
                    header={updateMessage === "success" ? "Success" : "Fail"}
                    body={`Update product ${updateMessage}`}
                />
            }

            <div 
                className="grid product-form"
            >
                <fieldset 
                    className={clsx('product-form__general', {
                        'disappear': updateStep !== 1
                    })}
                >
                    <legend className='text-muted'>GENERAL</legend>
                    <fieldset>
                        <legend className='text-muted'>INFO</legend>
                        <div className="mb-3">
                            <label className="form-label">Product Name (require)</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={product?.name ? product.name : ''}
                                onChange={(e) => setProduct({...product, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price (require)</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.price ? product.price : ''}
                                onChange={(e) => setProduct({...product, price: e.target.value})}
                                required
                            />
                        </div> 
                        <div className="mb-3">
                            <label className="form-label">Review Point</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.star ? product.star : ''}
                                onChange={(e) => setProduct({...product, star: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea 
                                className="form-control"
                                value={product?.description ? product.description : ''}
                                onChange={(e) => setProduct({...product, description: e.target.value})}
                            />
                        </div>
                        <div className='general-info__type-brand'>
                            <div className="mb-3">
                                <label className="form-label">Type (require)</label>
                                <input
                                    type="text" 
                                    className="form-control"
                                    list='typeListOption'
                                    value={product?.type ? product?.type : ''}
                                    onChange={(e) => setProduct({...product, type: e.target.value})}
                                    readOnly
                                />
                                <datalist id="typeListOption">
                                    <option value="smartphone"/>
                                    <option value="laptop"/>
                                </datalist>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Brand (require)</label>
                                <input
                                    className="form-control"
                                    value={product?.brand ? product.brand : ''}
                                    onChange={(e) => setProduct({...product, brand: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>HIGHLIGTH FEATURE</legend>
                        <div className="mb-3">
                            <label className="form-label">Highlight feature 1</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.hf1 ? product.hf1 : ''}
                                onChange={(e) => setProduct({...product, hf1: e.target.value})}    
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Highlight feature 2</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.hf2 ? product.hf2 : ''}
                                onChange={(e) => setProduct({...product, hf2: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Highlight feature 3</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.hf3 ? product.hf3 : ''}
                                onChange={(e) => setProduct({...product, hf3: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Highlight feature 4</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.hf4 ? product.hf4 : ''}
                                onChange={(e) => setProduct({...product, hf4: e.target.value})}
                            />
                        </div>
                    </fieldset>
                </fieldset>

                <fieldset 
                    className={clsx('product-form__mobile', {
                        'disappear': updateStep !== 2 || (product.type !== '' && product.type !== 'smartphone')
                    })}
                >
                    <legend className='text-muted'>MOBILE</legend>
                    <fieldset>
                        <legend className='text-muted'>SCREEN</legend>
                        <div>
                            <div className="mb-3">
                                <label className="form-label">Size</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={product?.screenSize ? product.screenSize : ''}
                                    onChange={(e) => setProduct({...product, screenSize: e.target.value})}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Resolution</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={product?.resolution ? product.resolution : ''}
                                    onChange={(e) => setProduct({...product, resolution: e.target.value})}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Refresh rate</label>
                                <input 
                                    className="form-control" 
                                    list="refreshRateListOption" 
                                    placeholder='Type to search'
                                    value={product?.refreshRate ? product.refreshRate : ''}
                                    onChange={(e) => setProduct({...product, refreshRate: e.target.value})}
                                />
                                <datalist id="refreshRateListOption">
                                    <option value="60"/>
                                    <option value="90"/>
                                    <option value="120"/>
                                </datalist>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>BACK CAMERA</legend>
                        <div className="mb-3">
                            <label className="form-label">Tech</label>
                            <textarea 
                                className="form-control"
                                value={product?.backcam ? product.backcam : ''}
                                onChange={(e) => setProduct({...product, backcam: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Video</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.backcamVideo ? product.backcamVideo : ''}
                                onChange={(e) => setProduct({...product, backcamVideo: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Feature</label>
                            <textarea 
                                className="form-control"
                                value={product?.backcamFeature ? product.backcamFeature : ''}
                                onChange={(e) => setProduct({...product, backcamFeature: e.target.value})}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>FRONT CAMERA</legend>
                        <div className="mb-3">
                            <label className="form-label">Tech</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.frontcam ? product.frontcam : ''}
                                onChange={(e) => setProduct({...product, frontcam: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Video</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.frontcamVideo ? product.frontcamVideo : ''}
                                onChange={(e) => setProduct({...product, frontcamVideo: e.target.value})}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>CPU</legend>
                        <div className="mb-3">
                            <label className="form-label">Chipset</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.cpuChipset ? product.cpuChipset : ''}
                                onChange={(e) => setProduct({...product, cpuChipset: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tech</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.cpuTech ? product.cpuTech : ''}
                                onChange={(e) => setProduct({...product, cpuTech: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">GPU</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.gpu ? product.gpu : ''}
                                onChange={(e) => setProduct({...product, gpu: e.target.value})}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>RAM & ROM</legend>
                        <div className="mb-3">
                            <label className="form-label">Ram capacity</label>
                            <input 
                                className="form-control" 
                                list="ramListOption" 
                                placeholder="Type to search"
                                value={product?.ram ? product.ram : ''}
                                onChange={(e) => setProduct({...product, ram: e.target.value})}
                            />
                            <datalist id="ramListOption">
                                <option value="4"/>
                                <option value="6"/>
                                <option value="8"/>
                                <option value="12"/>
                                <option value="16"/>
                            </datalist>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Rom capacity</label>
                            <input 
                                className="form-control" 
                                list="romListOption" 
                                placeholder='Type to search'
                                value={product?.rom ? product.rom : ''}
                                onChange={(e) => setProduct({...product, rom: e.target.value})}
                            />
                            <datalist id="romListOption">
                                <option value="16"/>
                                <option value="32"/>
                                <option value="64"/>
                                <option value="128"/>
                                <option value="256"/>
                            </datalist>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>BATTERY</legend>
                        <div className="mb-3">
                            <label className="form-label">Battery capacity</label>
                            <input 
                                className="form-control" 
                                list="batteryListOption" 
                                placeholder='Type to search'
                                value={product?.batteryCap ? product.batteryCap : ''}
                                onChange={(e) => setProduct({...product, batteryCap: e.target.value})}
                            />
                            <datalist id='batteryListOption'>
                                <option value="4000"/>
                                <option value="4200"/>
                                <option value="4500"/>
                                <option value="5000"/>
                            </datalist>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tech</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.batteryCharge ? product.batteryCharge : ''}
                                onChange={(e) => setProduct({...product, batteryCharge: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Port</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.batteryPort ? product.batteryPort : ''}
                                onChange={(e) => setProduct({...product, batteryPort: e.target.value})}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>CONNECTION</legend>
                        <div className="mb-3">
                            <label className="form-label">Sim card</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.sim ? product.sim : ''}
                                onChange={(e) => setProduct({...product, sim: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">OS</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.os ? product.os : ''}
                                onChange={(e) => setProduct({...product, os: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">NFC</label>
                            <input 
                                className="form-control" 
                                list="nfcListOption" 
                                placeholder='Type to search'
                                value={product?.nfc ? product.nfc : ''}
                                onChange={(e) => setProduct({...product, nfc: e.target.value})}
                            />
                            <datalist id='nfcListOption'>
                                <option value="Co"/>
                                <option value="Khong"/>
                            </datalist>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Support</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.support ? product.support : ''}
                                onChange={(e) => setProduct({...product, support: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Wifi</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.wifi ? product.wifi : ''}
                                onChange={(e) => setProduct({...product, wifi: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Bluetooth</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.bluetooth ? product.bluetooth : ''}
                                onChange={(e) => setProduct({...product, bluetooth: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">GPS</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.gps ? product.gps : ''}
                                onChange={(e) => setProduct({...product, gps: e.target.value})}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>DESIGN</legend>
                        <div className="mb-3">
                            <label className="form-label">Weight</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.weight ? product.weight : ''}
                                onChange={(e) => setProduct({...product, weight: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Material</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.material ? product.material : ''}
                                onChange={(e) => setProduct({...product, material: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Side Material</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.border ? product.border : ''}
                                onChange={(e) => setProduct({...product, border: e.target.value})}
                            />
                        </div>
                    </fieldset>
                </fieldset>

                <fieldset 
                    className={clsx('product-form__laptop', {
                        'disappear': updateStep !== 2 || (product.type !== '' && product.type !== 'laptop')
                    })}
                >
                    <legend className='text-muted'>LAPTOP</legend>

                    <fieldset>
                        <legend className='text-muted'>SCREEN</legend>
                        <div>
                            <div className="mb-3">
                                <label className="form-label">Size</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={product?.screenSize ? product.screenSize : ''}
                                    onChange={(e) => setProduct({...product, screenSize: e.target.value})}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Resolution</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={product?.resolution ? product.resolution : ''}
                                    onChange={(e) => setProduct({...product, resolution: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Screen Tech</label>
                            <textarea 
                                className="form-control"
                                value={product?.screenTech ? product.screenTech : ''}
                                onChange={(e) => setProduct({...product, screenTech: e.target.value})}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>TECH</legend>
                        <div className="mb-3">
                            <label className="form-label">CPU</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.cpu ? product.cpu : ''}
                                onChange={(e) => setProduct({...product, cpu: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">GPU</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.gpu ? product.gpu : ''}
                                onChange={(e) => setProduct({...product, gpu: e.target.value})}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>RAM & ROM</legend>
                        <div className="mb-3">
                            <label className="form-label">Ram capacity</label>
                            <input 
                                className="form-control" 
                                list="ramListOption" 
                                placeholder="Type to search"
                                value={product?.ram ? product.ram : ''}
                                onChange={(e) => setProduct({...product, ram: e.target.value})}
                            />
                            <datalist id="ramListOption">
                                <option value="4"/>
                                <option value="8"/>
                                <option value="16"/>
                                <option value="32"/>
                            </datalist>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Rom capacity</label>
                            <input 
                                className="form-control" 
                                list="romListOption" 
                                placeholder='Type to search'
                                value={product?.rom ? product.rom : ''}
                                onChange={(e) => setProduct({...product, rom: e.target.value})}
                            />
                            <datalist id="romListOption">
                                <option value="128"/>
                                <option value="256"/>
                                <option value="500"/>
                                <option value="1024"/>
                            </datalist>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>CONNECTION</legend>
                        <div className="mb-3">
                            <label className="form-label">OS</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.os ? product.os : ''}
                                onChange={(e) => setProduct({...product, os: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Wifi</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.wifi ? product.wifi : ''}
                                onChange={(e) => setProduct({...product, wifi: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Bluetooth</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.bluetooth ? product.bluetooth : ''}
                                onChange={(e) => setProduct({...product, bluetooth: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Webcam</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.webcam ? product.webcam : ''}
                                onChange={(e) => setProduct({...product, webcam: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Port</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.port ? product.port : ''}
                                onChange={(e) => setProduct({...product, port: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Battery</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.battery ? product.battery : ''}
                                onChange={(e) => setProduct({...product, battery: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Audio</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.audio ? product.audio : ''}
                                onChange={(e) => setProduct({...product, audio: e.target.value})}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className='text-muted'>DESIGN</legend>
                        <div className="mb-3">
                            <label className="form-label">Size</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.size ? product.size : ''}
                                onChange={(e) => setProduct({...product, size: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Weight</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.weight ? product.weight : ''}
                                onChange={(e) => setProduct({...product, weight: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Material</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={product?.material ? product.material : ''}
                                onChange={(e) => setProduct({...product, material: e.target.value})}
                            />
                        </div>
                    </fieldset>
                </fieldset>
                
                {/* button */}
                <div className='mt-3'>
                    { updateStep > 1 && <button 
                        type="submit" 
                        className='btn btn-light me-1'
                        onClick={() => setUpdateStep(updateStep - 1)}
                    >
                        Previous
                    </button> }
                    { updateStep === 2 ? 
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            onClick={() => handleUpdateProduct()}
                        >
                            Submit
                        </button> :
                        <button 
                            type="submit" 
                            className={clsx('btn btn-primary ms-1', {
                                'disabled': product && !validateProduct(product)
                            })}
                            onClick={() => setUpdateStep(updateStep + 1)}
                        >
                            Next
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditProduct