import React from 'react'
import { BiSave } from 'react-icons/bi'
import { SmallCloseIcon } from '@chakra-ui/icons'
import styles from '~/styles/components/novo-aparelho.module.less'
import { Box, Button, Flex, IconButton, Input } from '@chakra-ui/react'


export default function NovoAparelho({ criar, cancelar }) {
    
    const [props, setProps] = React.useState({
        nome: 'Lâmpada de LED',
        gasto: 12,
        quantidade: 1,
        horas: 12
    })

    return (
        <Box className={styles.Card}>
            <IconButton as={Button} icon={<BiSave />} className={styles.Button} title='Salvar aparelho' onClick={() => criar(props)} />
            <IconButton as={Button} icon={<SmallCloseIcon />} className={styles.Button} title='Cancelar aparelho' onClick={cancelar} />

            <Flex className={styles.Line}>
                <label htmlFor='novo-nome'>Nome:</label>
                <Input id='novo-nome' value={props.nome} onChange={e => setProps({...props, nome: e.target.value})} />
            </Flex>
            <Flex className={styles.Line}>
                <label htmlFor='novo-quantidade'>Quantidade:</label>
                <Input id='novo-quantidade' value={props.quantidade} onChange={e => setProps({...props, quantidade: Number(e.target.value.replace(/\D/gu, ''))})} />
            </Flex>
            <Flex className={styles.Line}>
                <label htmlFor='novo-potencia'>Potência (W):</label>
                <Input id='novo-potencia' value={props.gasto} onChange={e => setProps({...props, gasto: Number(e.target.value.replace(/\D/gu, ''))})} />
            </Flex>
            <Flex className={styles.Line}>
                <label htmlFor='novo-horas'>Tempo de uso diário:</label>
                <Input id='novo-horas' value={props.horas} onChange={e => setProps({...props, horas: Number(e.target.value.replace(/\D/gu, ''))})} />
            </Flex>
        </Box>
    )
}
