import React, { PureComponent, Fragment, Suspense } from "react";
import { connect } from "react-redux";
import { Card, CardContent, Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import {
  BigPlayButton,
  ControlBar,
  CurrentTimeDisplay,
  ForwardControl,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  TimeDivider,
  VolumeMenuButton,
} from "video-react";
import { getMedias } from "../../redux/actions";
import { backEndUrl } from "../../constants/defaultValues";
import { mediaVideoTableOptions } from "../../constants/tableOptions";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Separator } from "../../components/Layouts";

class Media extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideoName: null,
      selectedVideoSource: null,
      player: null,
      currentTime: null,
    };
  }

  componentDidMount = () => {
    const { getMedias } = this.props;

    this._isMounted = true;
    getMedias();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(_prevProps, prevState) {
    const { medias } = this.props;
    const { selectedVideoSource } = this.state;

    if (selectedVideoSource === null && medias?.length !== 0) {
      let selectedVideoName = medias[0]?.title;
      let selectedVideoSource = `${backEndUrl}/assets/vid/iae/${medias[0]?.id}.mp4`;

      this.setState({
        selectedVideoName,
        selectedVideoSource,
      });
    }
    if (selectedVideoSource !== prevState.selectedVideoSource) {
      this.player.load();
    }
  }

  static getDerivedStateFromProps(props) {
    const { getMediasLoading, medias } = props;

    if (!getMediasLoading && medias?.length !== 0) {
      return {
        videos: medias,
      };
    }
    return {};
  }

  render() {
    const { _isMounted } = this;
    const { match, getMediasLoading } = this.props;
    const { videos, selectedVideoSource } = this.state;
    const mediaVideoTableColumns = [
      {
        name: "id",
        options: {
          filter: false,
          searchable: false,
          customBodyRender: (value, tableMeta) => {
            const { rowData } = tableMeta;

            return (
              <Grid container>
                <Grid item xs={{ size: "auto" }}>
                  <div>
                    <img
                      style={{
                        width: "160px",
                        height: "90px",
                      }}
                      src={`${backEndUrl}/assets/vid/iae/${value}.png`}
                      alt={value}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <Grid container style={{ fontSize: 15, fontWeight: "bold" }}>
                    {rowData[7]}
                  </Grid>
                  <Grid container style={{ fontSize: 14 }}>
                    {" "}
                    Administrator
                  </Grid>
                  <Grid container style={{ fontSize: 12 }}>
                    {rowData[1]}
                  </Grid>
                </Grid>
              </Grid>
            );
          },
          customHeadRender: () => (
            <th
              key={0}
              style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
            />
          ),
        },
      },
      {
        name: "uploadedDateFormated",
        options: {
          display: "excluded",
          filter: false,
          searchable: false,
        },
      },
      {
        name: "uploaderName",
        options: {
          display: "excluded",
          filter: false,
          searchable: false,
        },
      },
      {
        name: "fileName",
        options: {
          display: "excluded",
          searchable: false,
          filter: false,
        },
      },
      {
        name: "type",
        options: {
          display: "excluded",
          filter: false,
          searchable: false,
        },
      },
      {
        name: "category",
        options: {
          display: "excluded",
          filter: false,
          searchable: false,
        },
      },
      {
        name: "viewCount",
        options: {
          display: "excluded",
          filter: false,
          searchable: false,
        },
      },
      {
        name: "title",
        options: {
          display: "excluded",
          filter: false,
          sortThirdClickReset: true,
        },
      },
    ];

    mediaVideoTableOptions.onCellClick = (_colData, cellMeta) => {
      const { dataIndex } = cellMeta;
      let selectedVideoName = videos[dataIndex]?.title;
      let selectedVideoSource = `${backEndUrl}/assets/vid/iae/${videos[dataIndex]?.id}.mp4`;

      this.setState({
        selectedVideoName,
        selectedVideoSource,
      });
    };

    mediaVideoTableOptions.textLabels = {
      body: {
        noMatch:
          !getMediasLoading && _isMounted
            ? "❌ There is no matching data to display"
            : "⏳ Loading...",
      },
    };

    return (
      <Suspense fallback={<div className="loading" />}>
        <Fragment>
          <Grid container>
            <Grid item xs={12}>
              <Breadcrumb heading="Media" match={match} />
              <Separator className="mb-5" />
            </Grid>
          </Grid>

          <Card className="pt-5  pl-2 pr-2 pb-2" elevation={4}>
            <CardContent>
              <Grid container>
                <Grid item xs={12} lg={6}>
                  <Player
                    aspectRatio="16:9"
                    fluid={true}
                    preload="metadata"
                    ref={(player) => {
                      this.player = player;
                    }}
                  >
                    <source src={selectedVideoSource} />
                    <BigPlayButton position="center" />
                    <ControlBar>
                      <ReplayControl order={1.1} seconds={10} />
                      <ForwardControl order={1.2} seconds={30} />
                      <CurrentTimeDisplay order={4.1} />
                      <TimeDivider order={4.2} />
                      <PlaybackRateMenuButton
                        order={7.1}
                        rates={[2, 1.5, 1, 0.75, 0.5]}
                      />
                      <VolumeMenuButton order={8.1} />
                    </ControlBar>
                  </Player>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Grid container>
                    <Grid item lg={1} />
                    <Grid item lg={11}>
                      <MUIDataTable
                        columns={mediaVideoTableColumns}
                        data={!getMediasLoading && _isMounted ? videos : []}
                        options={mediaVideoTableOptions}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Grid container>
            <Separator className="mb-5" />
          </Grid>
        </Fragment>
      </Suspense>
    );
  }
}

const mapStateToProps = ({ auth, media }) => {
  const { token } = auth;
  const { getMediasLoading, medias } = media;

  return { token, getMediasLoading, medias };
};
const mapActionsToProps = { getMedias };

export default connect(mapStateToProps, mapActionsToProps)(Media);
