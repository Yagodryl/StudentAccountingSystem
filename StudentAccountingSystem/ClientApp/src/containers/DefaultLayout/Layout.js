import React from 'react';
// import { Container } from 'reactstrap';
import { Layout } from 'antd';
import "./DefaultLayout.scss";

const { Footer, Content } = Layout;
const Bg={
    background: "linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), url('https://media.edutopia.org/styles/responsive_2880px_16x9/s3/masters/d7_images/cover_media/bill-169hero-8tips.jpg')",
    //  background: "url('https://media.edutopia.org/styles/responsive_2880px_16x9/s3/masters/d7_images/cover_media/bill-169hero-8tips.jpg')",
    width:"100%", height:"100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
     position: "absolute",
    //  Filter: "blur(8px)",
      WebkitFilter: "blur(5px)",
     
 }

 const LayoutStyle ={
    width:"100%", height:"100%",
    position: "absolute",
    background: 'none'
 }


export default props => (

    <React.Fragment>
    <div style={Bg}> </div>
        <Layout style={LayoutStyle} >
        <Content>
            { props.children }
        </Content>
        {/* <Footer>
            <div style={{width: '100%', height: '200px', background: 'black'}}/>
        </Footer> */}
        </Layout>
        </React.Fragment>
);