import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
  Heading,
  useColorMode,
  Stack,
  StackDivider,
  Tooltip,
  Flex,
  Button,
} from "@chakra-ui/react";
import { CiCircleCheck, CiCircleChevDown, CiPhone } from "react-icons/ci";
import { FcMultipleDevices, FcSmartphoneTablet } from "react-icons/fc";
import { IoWaterSharp } from "react-icons/io5";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaRegHandPointUp } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import moment from "moment/moment";
import "moment/locale/uk";
import { Link } from "react-router-dom";
const DeviceItem = ({ item }) => {
  const { colorMode } = useColorMode();
  console.log(item);
  return (
    <Card
      cursor={"context-menu"}
      width={"300px"}
      height={"400px"}
      backgroundColor={colorMode == "dark" ? "#4ew4ew" : "#4ew4ew"}
    >
      <CardHeader display={"flex"} gap={"10px"}>
        <FcMultipleDevices fontSize={30} />
        <Tooltip shouldWrapChildren label="Номер апарата">
          <Heading size="md">{item.code}</Heading>
        </Tooltip>
        <Tooltip shouldWrapChildren label="Статус апарата">
          <CiCircleCheck fill="green" fontSize={30} />
        </Tooltip>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Підсумок за сьогодні
            </Heading>
            <Flex flexDir={"row"} gap={3}>
              <Tooltip
                shouldWrapChildren
                label={`Продано літрів за ${moment(new Date()).format("L")}`}
              >
                <Flex alignItems={"center"} textAlign={"center"} gap={1}>
                  <IoWaterSharp
                    fontSize={30}
                    fill="lightblue"
                    color="lightblue"
                  />
                  23 л
                </Flex>
              </Tooltip>
              <Tooltip
                shouldWrapChildren
                label={`Зароблено коштів за сьогодні`}
              >
              <Flex alignItems={"center"} textAlign={"center"} gap={1}>
                <FaHandHoldingDollar
                  fontSize={30}
                  fill="lightblue"
                  color="lightblue"
                />
                600 грн
              </Flex>
              </Tooltip>
            </Flex>
          </Box>
          <Box>
  
            <Text pt="2" fontSize="sm">
              <Tooltip shouldWrapChildren label={`Дата активації`}>
                <Flex alignItems={"center"} textAlign={"center"} gap={1}>
                  <CiCalendarDate
                    fontSize={30}
                    fill="lightblue"
                    color="lightblue"
                  />
                  <Text>{moment(item.created_at).format("lll")}</Text>
                </Flex>
              </Tooltip>
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Панель керування
            </Heading>

            <Text pt="2" fontSize="sm">
              Натисніть для відкриття панелі керування апаратом.
            </Text>
          </Box>
        </Stack>
        <Link to={`/devices/${item.code}`}>
          <Button display={"flex"} gap={10} width={"100%"} variant={"ghost"}>
            <Text>Усі налаштування</Text>
            <IoSettingsOutline />
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default DeviceItem;
