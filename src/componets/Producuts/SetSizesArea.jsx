import React, {useCallback, useEffect, useState} from 'react';
import {TextInput} from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles({
  iconCell:{
    height:48,
    width:48,
    padding:0
  },
  checkIcon: {
      float: 'right'
  },
})

const SetSizesArea = (props) => {
  const classes = useStyles();

  const [index, setIndex] = useState(0);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  const inputSize = useCallback((event) => {
    setSize(event.target.value)
  }, [setSize])

  const inputQuantity = useCallback((event) => {
    setQuantity(event.target.value)
  }, [setQuantity])

  // サイズと数量のstateを変更するメソット
  const addSize = useCallback((index, size, quantity)=>{
      if(size === "" || quantity === ""){
        return false;
      }else{
        // 新規追加の場合
        if(index === props.sizes.length){
          props.setSizes(prevState => [...prevState, {size: size, quantity: quantity}])
          setIndex(index + 1);
          setSize("");
          setQuantity(0);
        }else{
          // indexと配列数が一致していない場合なので編集の時
          const newSizes = props.sizes;
          newSizes[index] = {size:size, quantity:quantity}
          props.setSizes(newSizes)
          // 初期値に値を戻す
          setIndex(newSizes.length);
          setSize("");
          setQuantity(0);
        }
      
      }
  })  

  // サイズと数量を編集
  const editSize = (index, size, quantity) => {
        setIndex(index);
        setSize(size);
        setQuantity(quantity);
  }

  // 削除する際の実装
  const deleteSize = (deleteIndex) => {
        const newSizes = props.sizes.filter((item, index) => index !== deleteIndex)
        props.setSizes(newSizes);
    }

  // 編集が行われた場合にindexを修正する
  const memoIndex = useEffect(()=>{
    setIndex(props.sizes.length);
  }, [props.sizes.length])

  return(
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell}></TableCell>
              <TableCell className={classes.iconCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 && (
              props.sizes.map((item, index) => (
                  <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className={classes.iconCell}>
                    <IconButton className={classes.iconCell} onClick={()=>editSize(index, item.size, item.quantity)}>
                    <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell className={classes.iconCell}>
                    <IconButton className={classes.iconCell} onClick={()=> deleteSize(index)}>
                    <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div>
        <TextInput
          fullWidth={false}
          label={"サイズ"}
          multiline={false}
          required={true}
          rows={1}
          value={size}
          type={"text"}
          onChange={inputSize}
        />
        <TextInput
          fullWidth={false}
          label={"数量"}
          multiline={false}
          required={true}
          rows={1}
          value={quantity}
          type={"number"}
          onChange={inputQuantity}
        />
        </div>
        <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
          <CheckCircleIcon/>
        </IconButton>
      </TableContainer >
    </div>

  )
}

export default SetSizesArea