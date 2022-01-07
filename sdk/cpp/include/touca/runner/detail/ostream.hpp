// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

#pragma once

#include <iostream>
#include <sstream>

#include "touca/lib_api.hpp"

/**
 * @brief Captures content printed to standard output and error streams.
 */
struct TOUCA_CLIENT_API OutputCapturer {
  OutputCapturer();
  ~OutputCapturer();

  void start_capture();
  void stop_capture();

  std::string cerr() const;
  std::string cout() const;

 private:
  bool _capturing = false;
  std::streambuf* _err;
  std::streambuf* _out;
  std::stringstream _buferr;
  std::stringstream _bufout;
};