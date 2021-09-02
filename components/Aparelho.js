import React from 'react'
import { calcularConsumos } from '~/pages/index'
import { SmallCloseIcon } from '@chakra-ui/icons'
import styles from '~/styles/components/aparelho.module.less'
import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react'


export default function ({aparelho, custo, taxa, remove}) {

    const consumos = calcularConsumos(aparelho.gasto * aparelho.quantidade, custo, taxa)
    
    return (
        <Box className={styles.Card}>
            <IconButton as={Button} icon={<SmallCloseIcon />} className={styles.Button} title='Remover aparelho' onClick={remove} />

            <Text className={styles.Name}>{`${aparelho.quantidade}x ${aparelho.nome}`}</Text>
            <Flex className={styles.Line}>
                <Text>Consumo padrão (1h): </Text>
                <Text>{`R$ ${consumos.hora.toFixed(2)}`}</Text>
            </Flex>
            <Flex className={styles.Line}>
                <Text>Consumo diário (24h): </Text>
                <Text>{`R$ ${consumos.diario.toFixed(2)}`}</Text>
            </Flex>
            <Flex className={styles.Line}>
                <Text>Consumo mensal (30 dias): </Text>
                <Text>{`R$ ${consumos.mensal.toFixed(2)}`}</Text>
            </Flex>
            
            <Box></Box>

            <Flex className={styles.Line}>
                <Text>Uso diário: </Text>
                <Text>{`${aparelho.horas} horas`}</Text>
            </Flex>
            <Flex className={styles.Line}>
                <Text>{`Consumo diário (${aparelho.horas}h): `}</Text>
                <Text>{`R$ ${(consumos.hora * aparelho.horas).toFixed(2)}`}</Text>
            </Flex>
            <Flex className={styles.Line}>
                <Text>{`Consumo diário (30 dias): `}</Text>
                <Text>{`R$ ${(consumos.hora * aparelho.horas * 30).toFixed(2)}`}</Text>
            </Flex>
        </Box>
    )
}
