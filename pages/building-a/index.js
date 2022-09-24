import Link from 'next/link';
import Script from 'next/script';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/layout';
import styles from '../../components/layout.module.css';
const PageTitle = "BuildingA";

function BuildingA({data}) {
    function clickDevice() {
        console.log("clicked");
    }
    return (
    <Layout>
      <Head>
        <title>{PageTitle}</title>
      </Head>
      <div className={styles.left_container}>
        <div>
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
            <h1>Building A</h1>
            <div><Image src="/on.svg" height={30} width={30} /><code className="heading2Xl">{data.onCounter}</code></div>
            <div><Image src="/off.svg" height={30} width={30} /><code className="heading2Xl">{data.offCounter}</code></div>
            <div>Total Bulbs: {data.onCounter + data.offCounter}</div>
            <div class="description">
                <br></br><br></br>
                <code>NOTE:</code><br></br>
                G-97: <br></br>Groud Level, deviceId 97<br></br><br></br>
                1-138: <br></br>Level 1, deviceId 138<br></br>
                ...
            </div>
        </div>
    </div>
    
    <div className="main_content">
        <div class="container">
            <table><tbody>
                <tr><th className={styles.leftAlign}>Alerts</th></tr>
                <tr><td>No messages</td></tr>
                <tr><th className={styles.leftAlign}>Devices</th></tr>
                <tr><td>
          { data.devices.map(function(device){
                return (<div className={styles.cell}>
                <a href={"/building-a/devices/"+device.deviceId} className="card">{device.level.substring(5) =="00"? "G":parseInt(device.level.substring(5))}-{parseInt(device.deviceId.substring(4))}<br></br>
                    {device.LightOutput > 0 ? "On":"Off"}</a></div>)
            })}
            </td></tr></tbody></table>
        </div>
    </div>
    </Layout>);
}

export async function getServerSideProps() {
    const res = await fetch(`http://127.0.0.1:3001/apis/devices/counter`);
    const data = await res.json();

    const res2 = await fetch(`http://127.0.0.1:3001/apis/devices`);
    const devices = await res2.json();

    data.devices = devices.devices;
    return {props: {data}};
}

export default BuildingA;