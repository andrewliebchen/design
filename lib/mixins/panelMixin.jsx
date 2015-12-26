PanelMixin = {
  getInitialState() {
    let urlParams = FlowRouter.getQueryParam('show');
    return {
      panel: urlParams ? urlParams : false
    };
  },

  handlePanelOpen(panelName) {
    this.setState({panel: panelName});
    FlowRouter.setQueryParams({show: panelName});
  },

  handlePanelClose() {
    this.setState({panel: null});
    FlowRouter.setQueryParams({show: null});
  },
}
