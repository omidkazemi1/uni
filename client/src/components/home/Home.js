import { Grid, Typography } from "@mui/material";
import useStyles from "./styles";

import bag from "./../../assets/images/bag.png";
import sun from "./../../assets/images/sun.png";
import cloud from "./../../assets/images/cloud.png";
import marker from "./../../assets/images/marker.png";
import sharper from "./../../assets/images/sharper.png";
import stapler from "./../../assets/images/stapler.png";

const Home = () => {
    const classes = useStyles();

    return (
        <>
            <Grid container maxWidth="lg" alignItems="center" px={3} mx="auto" mt={10}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    display="flex"
                    flexDirection="column"
                    alignItems={{ xs: "center", md: "flex-start" }}>
                    <Typography variant="h2" fontWeight="800" color="primary">
                        مکتب چی
                    </Typography>
                    <Typography variant="h6" color="primary.dark" my={2}>
                        لورم ایپسوم متن ساختگ ساختگی با
                    </Typography>
                    <Typography variant="body2">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
                        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
                        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
                        کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در
                        شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    display="flex"
                    justifyContent={{ xs: "center", md: "flex-end" }}>
                    <img width="70%" src={bag} alt="bag" />
                </Grid>
            </Grid>

            <img src={sun} alt="sun" className={classes.sun} />
            <img src={cloud} alt="cloud" className={classes.cloud} />
            <img src={sharper} alt="sharper" className={classes.sharper} />
            <img src={stapler} alt="stapler" className={classes.stapler} />
            <img src={marker} alt="marker" className={classes.marker} />
        </>
    );
};

export default Home;
