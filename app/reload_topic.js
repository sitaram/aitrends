import { fetchContent } from 'api';

class ReloadTopic {
  constructor(topic, tabs, updateStateCallback, activeRequests, processNextTopic, maxConcurrentRequests = 50) {
    this.topic = topic;
    this.tabs = tabs.filter((tab) => tab !== 'Divider'); // 'Overview' is handled separately
    this.updateStateCallback = updateStateCallback;
    this.maxConcurrentRequests = maxConcurrentRequests;
    this.contentResults = {};
    this.requestQueue = [];
    this.signal = new AbortController();
    this.activeRequests = activeRequests;
    this.processNextTopic = processNextTopic;
    this.tabs.forEach((tab) => {
      // Initialize contentResults structure for each tab
      this.contentResults[tab] = { status: 'pending', content: null };
      // Initial state set to 'loading' for UI
      this.updateStateCallback(`${this.topic}-${tab}`, 'loading');
    });
  }

  enqueueRequests() {
    this.tabs.forEach((tab) => {
      if (tab !== 'Overview') {
        this.requestQueue.push({ topic: this.topic, tab });
      }
    });
    this.processQueue();
  }

  processQueue() {
    while (this.activeRequests.size < this.maxConcurrentRequests && this.requestQueue.length > 0) {
      const { topic, tab } = this.requestQueue.shift();
      this.fetchData(topic, tab);
    }
  }

  async fetchData(topic, tab) {
    const key = `${topic}-${tab}`;
    try {
      this.activeRequests.add(key);
      this.activeRequests[key];
      const content = await fetchContent(
        topic,
        tab,
        null, // No payload
        false, // Not Overview
        false, // Not Online
        () => {}, // No Progress Callback
        this.signal.signal
      );

      // Update content result on success
      this.contentResults[tab] = { status: 'success', content: content.substr(0, 1000) };
      this.updateStateCallback(key, 'success');

      // Check if all tabs have been successfully fetched to proceed with summary
      if (this.areAllFetchesSuccessful()) {
        await this.processSummary();
      }
    } catch (error) {
      // Update content result on failure
      if (error.name !== 'AbortError') {
        this.contentResults[tab] = { status: 'error', content: null };
        this.updateStateCallback(key, 'error');
      }
    } finally {
      this.activeRequests.delete(key);
      this.processQueue();
      if (this.requestQueue.length == 0) this.processNextTopic(); // Try processing other topics
    }
  }

  areAllFetchesSuccessful() {
    return Object.keys(this.contentResults)
      .filter((key) => key !== 'Overview') // Exclude 'Overview' tab
      .map((key) => this.contentResults[key]) // Map to the corresponding values
      .every((result) => result.status === 'success'); // Check if every status is 'success'
  }

  async processSummary() {
    const summaryContent = Object.entries(this.contentResults)
      .filter(([tab, _]) => tab !== 'Overview') // Exclude 'Overview' from the summary payload
      .map(([tab, content]) => `\n\n----------------------\n\nTAB NAME: [[${tab}]]\nCONTENT: ${content}`)
      .join(', ');

    try {
      await fetchContent(
        this.topic,
        'Overview',
        summaryContent,
        true, // Is Overview
        false, // Not Online
        () => {}, // No Progress Callback
        this.signal.signal
      );

      // Notify success for 'Overview' tab
      this.updateStateCallback(`${this.topic}-Overview`, 'success');
    } catch (error) {
      // Notify failure for 'Overview' tab
      this.updateStateCallback(`${this.topic}-Overview`, 'error');
    }
  }

  cancelAllRequests() {
    this.signal.abort();
  }
}

export default ReloadTopic;
