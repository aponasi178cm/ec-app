import React , { useState,   useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/src/no_image.png'
import {useDispatch, useSelector} from 'react-redux';
import {push} from 'connected-react-router'
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {deleteProduct} from '../../reducks/products/operations'
import { getRole } from "../../reducks/users/selectors"


// スタイルと整える
const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('md')]: {
            margin: 16,
            width: 'calc(33.3333% - 32px)'
        }
    },
    content: {
        display: 'flex',
        padding: '16 8',
        textAlign: 'left',
        justifyContent: 'space-between',
        '&:last-child': {
            paddingBottom: 16
        }    
    },
    // icon: {
    //     marginRight: 0,
    //     marginLeft: 'auto'
    // },
    media: {
        height:0,
        paddingTop: '100%',
        // width:'100%',
        cursor:'pointer',
        // overflow: 'hidden',
        '&:hover': {
        opacity: 0.6,
        // transition:'1s all',
        // // transform:'scale(1.1)'  
        
    }  
        
    },
    pointer:{
      cursor:'pointer',
    },
    price: {
        color: theme.palette.secondary.dark,
        fontSize: 16
    },
    productName: {
        boxOrient: 'vertical',
        display: '-webkit-box',
        fontSize: 14,
        lineHeight: '18px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: 36,
            lineClamp: 2,
        },
        [theme.breakpoints.up('md')]: {
            height: 18,
            lineClamp: 1,
        }
    }
}));


const ProductCard = (props) => {
  const price = props.price.toLocaleString();
  const dispatch = useDispatch();

  // 画像の取得
  const images = (props.images.length > 0) ? props.images : [NoImage]
  const classes = useStyles();

  // ユーザーroleを取得
  const selector = useSelector((state) => state);
  const userRole = getRole(selector)

  // メニューの開閉状態
   const [anchorEl, setAnchorEl] = React.useState(null);
   const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

   const handleClose = () => {
        setAnchorEl(null);
    };

  return(
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={images[0].path}
        onClick={()=>dispatch(push('/product/' + props.id))}
      />
      <CardContent className={classes.content}>
         <div onClick={()=>dispatch(push('/product/' + props.id))} className={classes.pointer}>
           <Typography color="textSecondary" component="p">
           {props.name}
         </Typography>  
         <Typography component="p" className={classes.price}>
           ¥{price}
         </Typography>  
         </div>
         {userRole === "administrator" && (
            <>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
           <MenuItem onClick={()=>{dispatch(push("/product/edit/" + props.id)) 
            handleClose()
            }}>
              編集する
            </MenuItem>
            <MenuItem 
              onClick={()=>{
                dispatch(deleteProduct(props.id))
                handleClose()
              }}> 
              削除する
            </MenuItem>
        </Menu>
            </>
         )}       
      </CardContent >
    </Card>
  )
}

export default ProductCard;