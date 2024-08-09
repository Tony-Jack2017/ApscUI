import {Flex, FlexItem} from "@apsc/base-react";


const FlexPage = () => {
  return (
    <div className="flex-page">
      This is flex Page
      <Flex space={20}>
        <FlexItem>
          This is a flex item
        </FlexItem>
      </Flex>
    </div>
  )
}

export default FlexPage