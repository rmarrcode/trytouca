// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

#include "touca/cmp/startup.hpp"

#include <chrono>
#include <thread>

#include "touca/cmp/logger.hpp"
#include "touca/cmp/object_store.hpp"
#include "touca/devkit/platform.hpp"

void initialize_loggers(const Options& options) {
  touca::setup_console_logger(options.log_level);
  if (options.log_dir.has_value()) {
    touca::setup_file_logger(options.log_dir.value().string());
  }
}

bool run_startup_stage(const Options& options) {
  const auto& store = ObjectStore::get_instance(options);
  const auto max_attempts = options.startup_timeout / options.startup_interval;
  const auto& interval = std::chrono::milliseconds(options.startup_interval);
  touca::log_info("running start-up stage");
  touca::ApiUrl api(options.api_url);
  touca::Platform platform(api);
  for (auto i = 1u; i <= max_attempts; ++i) {
    if (!platform.handshake()) {
      touca::log_warn("failed to connect to backend: {}", platform.get_error());
    } else if (!store.status_check()) {
      touca::log_warn("failed to connect to object storage");
    } else {
      touca::log_info("start-up phase completed");
      return true;
    }
    touca::log_warn("running start-up stage: attempt ({}/{})", i, max_attempts);
    std::this_thread::sleep_for(interval);
  }
  return false;
}
