import { Typography } from "@material-ui/core"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import { NextPage } from "next"
import React from "react"
import { AppContext } from "../components/AppContext"
import { SpacingPaper } from "../components/atoms"
import { HeaderArticleContainer } from "../components/organisms"
import { Layout } from "../components/templates"
import { Page } from "../constants"
import { changePage } from "../store/page"
const useStyles = makeStyles((_: Theme) => {
  return createStyles({
      root: {},
    })
  }
)

type Props = {}

const Index: NextPage<Props> = (props: Props) => {
  const classes = useStyles(props)
  return (
    <Layout className={classes.root}>
      <HeaderArticleContainer>
        <SpacingPaper>
          <Typography variant="h5">Hello Next.js 👋</Typography>
        </SpacingPaper>

        <SpacingPaper noPadding>
          <Typography variant="h5">zero padding paper</Typography>
          <Typography variant="h6">
            This component use makeStyles refer to Theme and Props.
          </Typography>
        </SpacingPaper>
      </HeaderArticleContainer>
    </Layout>
  )
}
/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
 */
Index.getInitialProps = async (ctx: AppContext): Promise<Props> => {
  const { store } = ctx
  store.dispatch(
    changePage({
      id: Page.TOP.id,
    })
  )
  return store;
}
export default React.memo(Index)
