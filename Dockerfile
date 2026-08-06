FROM --platform=linux/amd64 ruby:2.6.10-slim

ENV BUNDLE_PATH="/usr/local/bundle"

RUN apt-get update -qq && \
  apt-get install --no-install-recommends -y \
  curl build-essential git \
  # Editor
  vim nano \
  # Clean up
  && rm -rf /var/lib/apt/lists/*

# Install Ruby bundler
RUN bash -c "gem install bundler -v '1.17.3'"

WORKDIR /app

CMD ["tail", "-f", "/dev/null"]
