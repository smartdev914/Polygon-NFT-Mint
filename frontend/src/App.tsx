import { ChakraProvider } from "@chakra-ui/provider";
import Layout from "./components/Layout";
import Home from "./pages/Home";

const App = () => {
  
  return (
    <ChakraProvider>
      <Layout>
        <Home />
      </Layout>
    </ChakraProvider>
  )
}

export default App;