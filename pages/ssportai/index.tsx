import MessageForm from '../page/ssportai/components/MessageForm'
import MessagesList from '../page/ssportai/components/MessageList'
import { NextPage } from 'next'
import { MessagesProvider } from '../page/ssportai/utils/useMessages'
import Layout from '../page/ssportai/components/Layout'

const IndexPage: NextPage = () => {
  return (
    <MessagesProvider>
      <Layout>
        <MessagesList />
        <div className="fixed bottom-0 right-0 left-0">
          <MessageForm />
        </div>
      </Layout>
    </MessagesProvider>
  )
}

export default IndexPage
