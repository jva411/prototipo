import React from 'react'
import styles from '~/styles/index.module.less'
import { AiOutlinePlus } from 'react-icons/ai'
import { Box, Button, Center, Flex, Heading, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import Aparelho from '~/components/Aparelho'
import NovoAparelho from '~/components/NovoAparelho'


/**
 * @param {number} gasto Potência (W) por hora
 * @param {number} custo Valor da energia em kWh
 * @param {number} taxa Taxa da bandeira a cada 100 kWh
 * @param {boolean} usarTaxa Utilizar ou não a taxa para os cálculos (default: false)
 */
function calcularConsumos(gasto, custo, taxa, usarTaxa=false){
    let aux = gasto
    let hora = custo * (aux/1000)
    if(usarTaxa) hora += taxa * Math.floor(aux / 100000)
    
    aux *= 24
    let diario = custo * (aux/1000)
    if(usarTaxa) diario += taxa * Math.floor(aux / 100000)
    
    aux *= 30
    let mensal = custo * (aux/1000)
    if(usarTaxa) mensal += taxa * Math.floor(aux / 100000)

    const consumos = {
        hora,
        diario,
        mensal
    }

    if(usarTaxa){
        aux = gasto * 24
        consumos.taxas = {}
        consumos.taxas.diario = taxa * Math.floor(aux / 100000)

        aux *= 30
        consumos.taxas.mensal = taxa * Math.floor(aux / 100000)
    }

    return consumos
}


export default function Principal(Props) {

    const [props, setProps] = React.useState({
        aparelhos: [
            {
                nome: 'Lampada de LED',
                gasto: 12,
                quantidade: 5,
                horas: 12 // Horas por dia que o aparelho fica ligado
            }
        ],
        novoAparelho: false,
        energia: 0.72,
        bandeiras: [
            {
                nome: 'Bandeira Verde',
                custo: 0.00,
                color: '#5DFF00'
            },
            {
                nome: 'Bandeira Amarela',
                custo: 1.34,
                color: '#ECFF00'
            },
            {
                nome: 'Bandeira Vermelha 1',
                custo: 4.16,
                color: '#FC6565'
            },
            {
                nome: 'Bandeira Vermelha 2',
                custo: 9.49,
                color: '#FF3333'
            },
            {
                nome: 'Bandeira Vermelha 3',
                custo: 14.20,
                color: '#FF0000'
            }
        ],
        bandeira: 0,
        flag: true
    })
    const ref = React.useRef()

    React.useEffect(() => {
        if(!props.flag) {
            props.flag = true
            setProps({...props})
            setTimeout(() => ref.current.focus(), 1)
        }
    }, [props.flag])

    
    
    const totais = calcularConsumos(
        props.aparelhos.reduce((acc, x) => acc + (x.gasto * x.quantidade * (x.horas/24)), 0),
        props.energia,
        props.bandeiras[props.bandeira].custo,
        true
    )


    return <Box className={styles.Root}>
        <Flex className={styles.Header}>
            <VStack>
                <label htmlFor='custo'>Custo da Energia:</label>
                <Flex>
                    <Input
                        id='custo'
                        defaultValue={props.energia}
                        placeholder='Energia'
                        onChange={e => {
                            props.energia = Number(e.target.value)
                            setProps({...props})
                        }}
                    />
                    <Text>kWh</Text>
                </Flex>
            </VStack>
            <Heading as='h2'>
                Energia:
                <span style={{color: props.bandeiras[props.bandeira].color}}>
                    {` R$ ${props.energia.toFixed(2)}`}
                </span>
            </Heading>
            <Flex>
                <VStack>
                    <Menu>
                        <MenuButton
                            as={Button}
                            id='select-button'
                            className={styles.Bandeira}
                            background={props.bandeiras[props.bandeira].color}
                        >
                            {props.bandeiras[props.bandeira].nome}
                        </MenuButton>
                        <MenuList>
                            {props.bandeiras.map((b, i) => (
                                <MenuItem key={i} value={i} onClick={() => setProps({...props, bandeira: i, flag: false})}>
                                    {b.nome}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    {props.flag
                        ? <>
                            <label htmlFor='custo-bandeira'>Custo da Bandeira:</label>
                            <Flex>
                                <Input
                                    id='custo-bandeira'
                                    defaultValue={props.bandeiras[props.bandeira].custo}
                                    placeholder='Taxa'
                                    ref={ref}
                                    onChange={e => {
                                        props.bandeiras[props.bandeira].custo = Number(e.target.value)
                                        setProps({...props})
                                    }}
                                />
                                <Text>100 kWh</Text>
                            </Flex>
                        </>
                        : <></>
                    }
                </VStack>
            </Flex>
        </Flex>
        <Text fontSize='2rem' fontWeight='600'>Aparelhos:</Text>
        <SimpleGrid gap='3rem' templateColumns='repeat(auto-fit, 35rem)' className={styles.Grid}>
            {props.aparelhos.map((x, i) => (
                <Aparelho key={i} aparelho={x} custo={props.energia} taxa={props.bandeiras[props.bandeira].custo} remove={() => {
                    props.aparelhos.splice(i, 1)
                    props.flag = false
                    setProps({...props})
                }} />
            ))}
            {props.novoAparelho
                ? <NovoAparelho
                    criar={data => {
                        props.aparelhos.push(data)
                        setProps({...props})
                    }}
                    cancelar={() => setProps({...props, novoAparelho: false})} />
                : <Center>
                    <IconButton as={Button} icon={<AiOutlinePlus />} className={styles.AddButton} title='Adicionar um aparelho' onClick={() => {
                        setProps({...props, novoAparelho: true})
                    }}/>
                </Center>
            }
        </SimpleGrid>

        <Box className={styles.Total}>
            <Text fontSize='2rem' fontWeight='600'>Total:</Text>

            <Flex className={styles.Line}>
                <Text>Consumo diário:</Text>
                <Text>{`R$ ${totais.diario.toFixed(2)}`}</Text>
            </Flex>
            <Flex className={styles.Line}>
                <Text>Consumo mensal:</Text>
                <Text>{`R$ ${totais.mensal.toFixed(2)}`}</Text>
            </Flex>

            <Text className={styles.Taxas}>Taxas:</Text>
            
            <Flex className={styles.Line}>
                <Text>Taxa do consumo diário:</Text>
                <Text>{`R$ ${totais.taxas.diario.toFixed(2)}`}</Text>
            </Flex>
            <Flex className={styles.Line}>
                <Text>Taxa do consumo mensal:</Text>
                <Text>{`R$ ${totais.taxas.mensal.toFixed(2)}`}</Text>
            </Flex>
        </Box>
    </Box>
}

export const getServerSideProps = async (context) => {
    let props = {}

    return {
        props: props
    };
};

export {calcularConsumos }
