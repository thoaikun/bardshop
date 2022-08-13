import React from 'react'
import clsx from 'clsx'

const MobileTech = ({ tech }) => {
    return (
        <>
            <div className='tech__col'>
                <div className='tech-element'>
                    <h4 className='mb-3'>Màn hình</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Kích thước màn hình</td>
                                <td>{tech?.screenSize ? `${tech.screenSize} inches` : ''}</td>
                            </tr>
                            <tr>
                                <td>Công nghệ màn hình</td>
                                <td>{tech?.screenTech ? tech.screenTech: ''}</td>
                            </tr>
                            <tr>
                                <td>Độ phân giải</td>
                                <td>{tech?.resolution ? tech.resolution : ''}</td>
                            </tr>
                            <tr>
                                <td>Tần số quét</td>
                                <td>{tech?.refreshRate ? `${tech.refreshRate} Hz` : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='tech-element'>
                    <h4 className='mb-3'>Camera sau</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Thông số</td>
                                <td>
                                    {tech?.backcam ? tech.backcam : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>Quay video</td>
                                <td>
                                    {tech?.backcamVideo ? tech.backcamVideo: ''}
                                </td>
                            </tr>
                            <tr>
                                <td>Tính năng</td>
                                <td>
                                    {tech?.backcamFeature ? tech?.backcamFeature : ''}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='tech-element'>
                    <h4 className='mb-3'>Camera trước</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Thông số</td>
                                <td>{tech?.frontcam ? tech.frontcam : ''}</td>
                            </tr>
                            <tr>    
                                <td>Video</td>
                                <td>{tech?.frontcamVideo ? tech.frontcamVideo : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='tech-element'>
                    <h4 className='mb-3'>CPU</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Chipset</td>
                                <td>{tech?.cpuChipset ? tech.cpuChipset : ''}</td>
                            </tr>
                            <tr>
                                <td>Thông số</td>
                                <td>{tech?.cpuTech ? tech.cpuTech : ''}</td>
                            </tr>
                            <tr>
                                <td>GPU</td>
                                <td>{tech?.gpu ? tech.gpu : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='tech__col'>
                <div className='tech-element'>
                    <h4 className='mb-3'>Ram & Bộ nhớ trong</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>RAM</td>
                                <td>{tech?.ram ? `${tech.ram} GB` : ''}</td>
                            </tr>
                            <tr>
                                <td>Bộ nhớ trong</td>
                                <td>{tech?.rom ? `${tech.rom} GB` : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className='tech-element'>
                    <h4 className='mb-3'>Pin</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Dung lượng</td>
                                <td>{tech?.batteryCap ? tech.batteryCap + 'mAh' : ''}</td>
                            </tr>
                            <tr>
                                <td>Công nghệ sạc</td>
                                <td>{tech?.batteryCharge ? tech.batteryCharge : ''}</td>
                            </tr>
                            <tr>
                                <td>Cổng sạc</td>
                                <td>{tech?.batteryPort ? tech.batteryPort : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='tech-element'>
                    <h4 className='mb-3'>Giao tiếp và kết nối</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Thẻ sim</td>
                                <td>{tech?.sim ? tech.sim : ''}</td>
                            </tr>
                            <tr>
                                <td>Hệ điều hành</td>
                                <td>{tech?.os ? tech.os : ''}</td>
                            </tr>
                            <tr>
                                <td>Công nghệ NFC</td>
                                <td>{tech?.nfc ? tech.nfc : ''}</td>
                            </tr>
                            <tr>
                                <td>Hộ trợ mạng</td>
                                <td>{tech?.support ? tech.support : ''}</td>
                            </tr>
                            <tr>
                                <td>Wifi</td>
                                <td>{tech?.wifi ? tech.wifi : ''}</td>
                            </tr>
                            <tr>
                                <td>Bluetooth</td>
                                <td>{tech?.bluetooth ? tech.bluetooth : ''}</td>
                            </tr>
                            <tr>
                                <td>GPS</td>
                                <td>{tech?.gps ? tech.gps : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='tech-element'>
                    <h4 className='mb-3'>Thiết kế & trọng lượng máy</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Trọng lượng</td>
                                <td>{tech?.weight ? tech.weight : ''}</td>
                            </tr>
                            <tr>
                                <td>Chất liệu mặt lưng</td>
                                <td>{tech?.material ? tech.material : ''}</td>
                            </tr>
                            <tr>
                                <td>Khung viền</td>
                                <td>{tech?.border ? tech.border : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

const LaptopTech = ({ tech }) => {
    return (
        <>
            <div className='tech__col'>
                <div className='tech-element'>
                    <h4 className='mb-3'>Màn hình</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Kích thước màn hình</td>
                                <td>{tech?.screenSize ? `${tech.screenSize} inches` : ''}</td>
                            </tr>
                            <tr>
                                <td>Công nghệ màn hình</td>
                                <td>{tech?.screenTech ? tech.screenTech: ''}</td>
                            </tr>
                            <tr>
                                <td>Độ phân giải</td>
                                <td>{tech?.resolution ? tech.resolution : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='tech-element'>
                    <h4 className='mb-3'>Camera</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Thông số</td>
                                <td>
                                    {tech?.webcam ? tech.webcam : ''}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='tech-element'>
                    <h4 className='mb-3'>CPU</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>CPU</td>
                                <td>{tech?.cpu ? tech.cpu : ''}</td>
                            </tr>
                            <tr>
                                <td>GPU</td>
                                <td>{tech?.gpu ? tech.gpu : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='tech-element'>
                    <h4 className='mb-3'>Pin</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Dung lượng</td>
                                <td>{tech?.battery ? tech.battery : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='tech__col'>
                <div className='tech-element'>
                    <h4 className='mb-3'>Ram & Bộ nhớ trong</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>RAM</td>
                                <td>{tech?.ram ? `${tech.ram} GB` : ''}</td>
                            </tr>
                            <tr>
                                <td>Bộ nhớ trong</td>
                                <td>{tech?.rom ? `${tech.rom} GB`: ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='tech-element'>
                    <h4 className='mb-3'>Giao tiếp và kết nối</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Hệ điều hành</td>
                                <td>{tech?.os ? tech.os : ''}</td>
                            </tr>
                            <tr>
                                <td>Wifi</td>
                                <td>{tech?.wifi ? tech.wifi : ''}</td>
                            </tr>
                            <tr>
                                <td>Bluetooth</td>
                                <td>{tech?.bluetooth ? tech.bluetooth : ''}</td>
                            </tr>
                            <tr>
                                <td>Cổng kết nối</td>
                                <td>{tech?.port ? tech.port : ''}</td>
                            </tr>
                            <tr>
                                <td>Audio</td>
                                <td>{tech?.audio ? tech.audio : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='tech-element'>
                    <h4 className='mb-3'>Thiết kế & trọng lượng máy</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>Kích thước</td>
                                <td>{tech?.size ? tech.size : ''}</td>
                            </tr>
                            <tr>
                                <td>Trọng lượng</td>
                                <td>{tech?.weight ? `${tech.weight} kg` : ''}</td>
                            </tr>
                            <tr>
                                <td>Chất liệu</td>
                                <td>{tech?.material ? tech.material : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

const TechTab = ({ model, tech, selectedTab }) => {
    return (
        <div
            className={clsx('tech', {
                'disappear': selectedTab !== 'Tech'
            })}
        >
            {model === 'MoblieTech' && <MobileTech tech={tech}/>}
            {model === 'LaptopTech' && <LaptopTech tech={tech}/>}
        </div>
    )
}

export default TechTab