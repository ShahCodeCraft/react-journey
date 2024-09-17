const mongoose = require('mongoose');

const webPushCampaignSchema = new mongoose.Schema({
  webPushCampaignName: {
    type: String,
    required: true,
  },
  webPushCampaignTags: {
    type: [String],
    required: true,
  },
  webPushProvider: {
    type: String,
    required: true,
  },
  webPushTitle: {
    type: String,
    required: true,
  },
  webPushContent: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  actionUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  actionUrl2: {
    type: String,
    required: true,
  },
  autoHide: {
    type: Boolean,
    required: true,
  },
  model: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const WebPushCampaign = mongoose.model('WebPushCampaign', webPushCampaignSchema);

module.exports = WebPushCampaign;
