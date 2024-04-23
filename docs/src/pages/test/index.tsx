import MainLayout from "../../components/layout/common/main-layout";
import CodeShow from "@apsc/utils/src/code-show";

const codeString =
`
    <MainLayout>
        <div className="container-page" style={{marginTop: "32px"}}>
            This is test page
            <CodeShow code={codeString} showLine={true}/>
        </div>
    </MainLayout>
`

const Test = () => {
  return (
    <div className="test-page">
      <MainLayout>
        <div className="container-page" style={{marginTop: "32px"}}>
          This is test page
          <CodeShow code={codeString} showLine={true}/>
        </div>
      </MainLayout>
    </div>
  )
}

export default Test
